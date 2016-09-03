// NODES SCHEMA
// -----------------------------------------------------------------------------

// Includes
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var nodeSchema = new Schema({
  node_id: { type: Number, required: true, unique: true },
  room: String,
  name: String,
  type: String,
  value: Boolean
});

var Node = mongoose.model('Node', nodeSchema, 'nodes');

module.exports = Node;
