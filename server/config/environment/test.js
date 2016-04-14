'use strict';

var path = require('path');

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/impact-test'
  },

  port: 3001,

  uploadDir: '.tmp',

  root: path.normalize(__dirname + '/../../test/')

};
