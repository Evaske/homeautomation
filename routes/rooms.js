// ROOMS ROUTES
// =============================================================================

// Includes
var express = require('express'),
  router = express.Router(),
  zwave = require('../zwave');

// Database Schema
var Room = require('../database/rooms.schema');

// Add Room
router.post('/', function(req, res) {
  var newRoom = Room({
    name: req.body.name,
    slug: req.body.slug,
    icon: req.body.icon
  });

  newRoom.save(function(err) {
    if (err) throw err;
    res.json({
      message: 'Room added to the system'
    });
  });
});

// Update Room
router.put('/', function(req, res) {
  Room.findOneAndUpdate({
    slug: req.body.slugold
  },{
    name: req.body.name,
    slug: req.body.slug,
    icon: req.body.icon
  }, function(err, room) {
    if (err) throw err;

    res.json({
      message: 'Room updated'
    });
  });
});

// Delete Room
router.delete('/', function(req, res) {
  Room.findOneAndRemove({
    slug: req.body.slug
  }, function(err) {
    if (err) throw err;
  });

  res.json({
    message: 'Room removed from the system'
  });
});

module.exports = router
