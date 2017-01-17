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
mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.connection.on('error', function(err) {
  if (config.env !== 'test') {
    // Ignore 'connection is already open' for test
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  }
});

mongoose.connection.once('open', function() {
  let gfs = new Grid(mongoose.connection.db, mongoose.mongo);
  app.set('gridfs', gfs);
});

require('./config/express').default(app);
require('./routes').default(app);
require('./components/register-handlebars');

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
