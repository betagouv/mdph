process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var config = require('./server/config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(config.mongo.uri, config.mongo.options)
