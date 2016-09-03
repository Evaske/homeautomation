// Z-WAVE SERVER
// =============================================================================
var ZWave = require('openzwave-shared');

// Z-Wave Instance - No Console Output
var zwave = new ZWave({
  ConsoleOutput: false,
  Logging: false
});

var os = require('os');

// Connection using USB
zwave.connect('/dev/cu.usbmodem1411');

zwavedriverpaths = {
	"darwin" : '/dev/cu.usbmodem1411',
	"linux"  : '/dev/ttyACM0'
}

zwave.connect( zwavedriverpaths[os.platform()] );

var scanComplete = false;

// // =============================================================//
// // FOR TESTING                                                  //
// // =============================================================//
// zwave.on('notification', function(nodeid, notif) {              //
//     console.log('====> Notification, hit ^C to finish.');       //
//     console.log('nodeid: ' + nodeid + ', notif: ' + notif);     //
// });                                                             //
//                                                                 //
// zwave.on('controller command', function(r,s) {                  //
//   console.log('controller commmand feedback: r=%d, s=%d',r,s);  //
// });                                                             //
//                                                                 //
// //==============================================================//

// Make sure the initial scan is complete. Ignore everything until then
zwave.on('scan complete', function() {
  scanComplete = true;
});

// Check for changing values and update the database
zwave.on('value changed', function(node, comclass, value) {
  if(scanComplete) {
    var nodeid = value.node_id;
    var value = value.value;
    var Node = require('./database/nodes.schema');

    Node.findOneAndUpdate({ node_id: nodeid }, { value: value }, function(err, node) {
      if (err) throw err;
    });
  }
});

// Exit Process
process.on('SIGINT', function() {
    console.log('Z-Wave disconnecting...');
    zwave.disconnect('/dev/cu.usbmodem1411');
    process.exit();
});

// Exports
module.exports = zwave;
