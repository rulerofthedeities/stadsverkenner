'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    compression = require('compression'),
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require('./server/routes'),
    db_url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/avc';

//config
app.set('port', process.env.PORT || 4600);
app.set('env', process.env.NODE_ENV || 'development');

//middleware
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

if (app.get('env') == 'development') {
  console.log('Server running in development mode');
}

//routing
routes.initialize(app, new express.Router());

//start server
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.Promise = global.Promise;
mongoose.connect(db_url, options, function(err) {
  console.log('Connected to MongoDB');
  app.listen(app.get('port'), function() { 
    console.log('Server up: http://localhost:' + app.get('port'));
  });
});
