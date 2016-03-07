var supertest = require('supertest');
var jwt = require('jsonwebtoken');

var User = require('../../api/user/user.model');
var Mdph = require('../../api/mdph/mdph.model');

var signToken = require('../../auth/auth.service').signToken;
var config = require('../../config/environment');

import {app, server} from '../../app';

function saveMdph(mdph) {
  return function() {
    var test = new Mdph({zipcode: 'test'});
    test.save((err, savedMdph) => {
      mdph = savedMdph;
    });

    return test;
  };
}

function saveUser() {
  return function() {
    var fakeUser = new User({
      provider: 'local',
      name: 'Fake User',
      email: 'user@test.com',
      password: 'hashedPassword',
      role: 'user'
    });

    return fakeUser.save();
  };
}

function saveUserAdmin() {
  return function(testMdph) {
    var fakeUserAdmin = new User({
      provider: 'local',
      name: 'Fake User Admin',
      email: 'admin@test.com',
      password: 'hashedPassword',
      role: 'adminMdph',
      mdph: testMdph._id
    });

    return fakeUserAdmin.save();
  };
}

function removeUsers() {
  return function() {
    User.remove().exec();
  };
}

function startServer(done) {

  var testMdph;
  var fakeUser;
  var fakeUserAdmin;
  var token;
  var tokenAdmin;

  var {app, server} = require('../../app');

  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });

  Mdph
    .remove().exec()
    .then(removeUsers())
    .then(saveMdph(testMdph))
    .then(mdph => {
      testMdph = mdph;
      return mdph;
    })
    .then(saveUserAdmin())
    .then(user => {
      fakeUserAdmin = user;
      tokenAdmin = jwt.sign({_id: user._id, role: user.role }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
    })
    .then(saveUser())
    .then(user => {
      fakeUser = user;
      token = jwt.sign({_id: user._id, role: user.role }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
    })
    .then(() => {
      return done({
        api: supertest.agent(`http://localhost:${config.port}`),
        server,
        testMdph,
        fakeUser,
        token,
        fakeUserAdmin,
        tokenAdmin
      });
    });
}

export default startServer;
