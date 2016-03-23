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

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

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

// Setup server
var app = express();
var server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);
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
