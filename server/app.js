/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
import moment from 'moment';
import Grid from 'gridfs-stream';

// Setup server
var app = express();
var server = http.createServer(app);

// Connect to MongoDB
if (!mongoose.connection.readyState) {
  // Connect to database
  mongoose.connect(config.mongo.uri, config.mongo.options)

  //This callback will be triggered once the connection is successfully established to MongoDB
  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.mongo.uri);
  });

  //This callback will be triggered after getting disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected from ' + config.mongo.uri);
  });

  mongoose.connection.on('error', function(err) {
    // Ignore 'connection is already open' for test
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  });
}

mongoose.connection.once('open', function() {
  let gfs = new Grid(mongoose.connection.db, mongoose.mongo);
  app.set('gridfs', gfs);
});

require('./config/express').default(app);
require('./routes').default(app);
require('./components/register-handlebars');
require('./cron/register');

moment.locale('fr');

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = {
  app,
  server
};
