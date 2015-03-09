#!/usr/bin/env node

var mongoose = require('mongoose');

// Connect to database
var options = {
  db: {
    safe: true
  }
};

mongoose.connect('mongodb://localhost/impact', options);

// Populate DB with sample data
require('./seed.js');
