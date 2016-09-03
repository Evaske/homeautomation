// EXPRESS SETUP
// =============================================================================

// Package Includes
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set view engine
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

var port = process.env.PORT || 8080;

// Allow CORS
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "DELETE");
  next();
});

// Routes
app.get('/', function (req, res) {
  var Room = require('./database/rooms.schema');

  Room.find(function(err, rooms) {
    if (err) throw err;

    res.render('index', { rooms: rooms, page: 'dashboard' });
  });
});

// Living Room Page
app.get('/rooms/:slug', function (req, res) {
  var Node = require('./database/nodes.schema');
  var Room = require('./database/rooms.schema');

  Node.find({ room: req.params.slug, type: 'socket'}, function(err, nodes) {
    if (err) throw err;

    Room.find({ slug: req.params.slug}, function(err, rooms) {
      res.render('room', { breadcrumb: '> ' + rooms[0].name, sockets: nodes });
    });
  });
});

app.use('/api/nodes', require('./routes/nodes'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/settings', require('./routes/settings'));

app.get('/*', function (req, res) {
  res.render('404');
});

// Server Start
app.listen(port);

// MONGOOSE SETUP
// =============================================================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/HomeAutomation');
