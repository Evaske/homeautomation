// SETTINGS ROUTES
// =============================================================================

// Includes
var express = require('express'),
  router = express.Router();

// Database Schema
var Room = require('../database/rooms.schema');

// Main Settings Page
router.get('/', function (req, res) {
  res.render('settings', { breadcrumb: '> Settings', page: 'settings' });
});

// ROOM SETTINGS
// =============================================================================

// Main Room Settings Page
router.get('/rooms', function (req, res) {
  Room.find(function(err, rooms) {
    if (err) throw err;

    res.render('settings-rooms', {
      breadcrumb: '> Settings > Rooms',
      rooms: rooms,
      page: 'settings'
    });
  });
});

// Add Room Page
router.get('/rooms/add', function (req, res) {
  res.render('settings-add-room', {
    page: 'settings'
  });
});

// Edit Room Page
router.get('/rooms/edit/:slug', function(req, res) {
  Room.find({ slug: req.params.slug }, function(err, rooms) {
    if (err) throw err;
    res.render('settings-edit-room', {
      breadcrumb: '> Settings > Edit Room',
      page: 'settings',
      roomID: rooms[0]._id,
      roomName: rooms[0].name,
      roomSlug: rooms[0].slug,
      roomIcon: rooms[0].icon
    });
  });
});

// NODE SETTINGS
// =============================================================================

// Add Node
router.get('/nodes/add', function (req, res) {
  Room.find(function(err, rooms) {
    if (err) throw err;

    res.render('node-add', {
      breadcrumb: '> Add Node',
      rooms: rooms,
      page: 'settings' });
  });
});

module.exports = router
