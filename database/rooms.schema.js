// ROOMS SCHEMA
// -----------------------------------------------------------------------------

// Includes
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var roomSchema = new Schema({
  name: String,
  slug: String,
  icon: String
});

var Room = mongoose.model('Room', roomSchema, 'rooms');

module.exports = Room;
