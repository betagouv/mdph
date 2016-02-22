var app = require('../../app');
var supertest = require('supertest');
var User = require('../../api/user/user.model');

var signToken = require('../../auth/auth.service').signToken;
var jwt = require('jsonwebtoken');
var config = require('../../config/environment');

module.exports = function() {
  var port = 3001;
  var server;
  var token;

  var apiSuperTest = function() {
    return supertest.agent('http://localhost:' + port);
  };

  var apiSuperTestAuth = function() {
    return apiSuperTest().set('authorization', 'Bearer ' + token);
  };

  beforeEach(function(done) {
    var user = new User({
      provider: 'local',
      name: 'Fake User',
      email: 'test@test.com',
      password: 'password',
      role: 'adminMdph'
    });

    server = app.listen(port);
    user.save(function(err) {
      if (err) {
        return done(err);
      }

      token = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
      done();
    });
  });

  afterEach(function(done) {
    User.remove(function() {
      done();
    });
  });

  afterEach(function(done) {
    server.close(done);
  });

  return {
    api: apiSuperTest,
    auth: apiSuperTestAuth,
    token: function() {
      return token;
    }
  };

};
