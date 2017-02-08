'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }

  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Upload directory
  uploadDir: process.env.UPLOAD_DIR || path.normalize(__dirname + '/../../uploads/'),

  // Mailjet config
  mailjet: {
    apiKey: process.env.API_KEY || 'mailjet_api_key',
    secretKey: process.env.SECRET_KEY || 'mailjet_secret_key',
  },

  // Server port
  port: process.env.PORT || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET || 'mdph-secret'
  },

  // List of user roles
  userRoles: ['user', 'adminMdph', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
