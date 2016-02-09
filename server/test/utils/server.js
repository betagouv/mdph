var app = require('../../app');
var supertest = require('supertest');

module.exports = function() {
  var port = 3001;
  var server;

  beforeEach(function() {
    server = app.listen(port);
  });

  afterEach(function() {
    server.close();
  });

  var apiSuperTest = function() {
    return supertest.agent('http://localhost:' + port);
  };

  return { api: apiSuperTest };

};
