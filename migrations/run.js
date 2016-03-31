#!/usr/bin/env node

require('babel-register');

import mongoose from 'mongoose';

// Connect to database
var options = {
  db: {
    safe: true
  }
};

mongoose.connect('mongodb://localhost/impact', options);

require('./exec.js');
