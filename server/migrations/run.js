#!/usr/bin/env node

require('babel-core/register');

var mongoose = require('mongoose');

// Connect to database
var options = {
  db: {
    safe: true
  }
};

mongoose.connect('mongodb://localhost/impact', options);

require('./exec.js');
