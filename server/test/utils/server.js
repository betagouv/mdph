var app = require('../../app');
var supertest = require('supertest');
var User = require('../../api/user/user.model');

module.exports = function() {
  var port = 3001;
  var server;

  var user = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@test.com',
    password: 'password'
  });

  var apiSuperTest = function() {
    return supertest.agent('http://localhost:' + port);
  };

  beforeEach(function(done) {
    server = app.listen(port);
    user.save(function(err) {
      if (err) {
        return done(err);
      }

      apiSuperTest().post('/auth/local');
    });
  });

  afterEach(function(done) {
    server.close(done);
  });

  afterEach(function(done) {
    user.remove(done);
  });

  return {
    api: apiSuperTest,
    api: apiSuperTest
  };

};
