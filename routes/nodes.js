// NODE ROUTES
// =============================================================================

// Includes
var express = require('express'),
  router = express.Router(),
  zwave = require('../zwave');

// Database Schema
var Node = require('../database/nodes.schema');

// Add Node
router.post('/', function(req, res) {
  zwave.addNode(false);

  // Node has been added, so lets save it to the database.
  zwave.on('node added', function(nodeid) {

    // Check if the node is already in the databae first as it should be
    // unique
    Node.find({node_id : nodeid}, function (err, node) {
      if (!node.length) {
        var newNode = Node({
          node_id: nodeid,
          name: req.body.name,
          type: req.body.type,
          room: req.body.room
        });

        newNode.save(function(err) {
          if (err) throw err;
          res.json({
            message: 'Node added to the system'
          });
        });
      }
    });
  });
});

// Delete Node
router.delete('/', function(req, res) {
  zwave.removeNode();

  // Node has been removed, so lets remove it from the database.
  zwave.on('node removed', function(nodeid) {
    // Find the node in the database and delete it if present
    Node.findOneAndRemove({
      node_id: nodeid
    }, function(err) {
      if (err) throw err;
    });
  });

  res.json({
    message: 'Node removed from the system'
  });
});

// Switch Control
router.post('/:nodeid', function(req, res) {
    var action = req.body.action;
    var nodeID = req.params.nodeid;

    if(action === 'on') {
      zwave.setValue(nodeID, 37, 1, 0, true);
      res.json({
        message: 'Node ' + nodeID + "turned on"
      });
    }

    if(action === 'off') {
      zwave.setValue(nodeID, 37, 1, 0, false);
      res.json({
        message: 'Node ' + nodeID + "turned off"
      });
    }
});

module.exports = router
