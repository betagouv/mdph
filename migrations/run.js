#!/usr/bin/env node

require('babel-register');

const mongoose = require('mongoose');

// Connect to database
var options = {
  db: {
    safe: true
  }
};

mongoose.connect('mongodb://localhost/impact', options);

require('./exec.js');
