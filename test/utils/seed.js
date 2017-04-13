import jwt from 'jsonwebtoken';

import User from '../../server/api/user/user.model';
import Profile from '../../server/api/profile/profile.model';
import Request from '../../server/api/request/request.model';
import Mdph from '../../server/api/mdph/mdph.model';
import config from '../../server/config/environment';

function saveMdph(mdph) {
  return function() {
    var test = new Mdph({zipcode: 'test', opened: true});
    test.save((err, savedMdph) => {
      mdph = savedMdph;
    });

    return test;
  };
}

function saveProfile() {
  return function(user) {
    var fakeProfile = new Profile({
      user: user._id
    });

    return fakeProfile.save();
  };
}

function saveUser() {
  return function() {
    var fakeUser = new User({
      provider: 'local',
      name: 'Fake User',
      email: 'user@test.com',
      password: 'hashedPassword',
      role: 'user',
      unconfirmed: false
    });

    return fakeUser.save();
  };
}

function saveUserAdminMdph() {
  return function(testMdph) {
    var fakeUserAdminMdph = new User({
      provider: 'local',
      name: 'Fake User Admin Mdph',
      email: 'admin-mdph@test.com',
      password: 'hashedPassword',
      role: 'adminMdph',
      mdph: testMdph._id,
      unconfirmed: false
    });

    return fakeUserAdminMdph.save();
  };
}

function saveUserAdmin() {
  return function() {
    var fakeUserAdmin = new User({
      provider: 'local',
      name: 'Fake User Admin',
      email: 'admin@test.com',
      password: 'hashedPassword',
      role: 'admin',
      unconfirmed: false
    });

    return fakeUserAdmin.save();
  };
}

function removeUsers() {
  return function() {
    User.remove().exec();
  };
}

function removeProfiles() {
  return function() {
    Profile.remove().exec();
  };
}

function removeRequests() {
  return function() {
    Request.remove().exec();
  };
}

export function populate(done) {
  var testMdph;
  var fakeUser;
  var fakeUserAdmin;
  var fakeUserAdminMdph;
  var token;
  var tokenAdmin;
  var tokenAdminMdph;

  Mdph
    .remove().exec()
    .then(removeUsers())
    .then(removeProfiles())
    .then(removeRequests())
    .then(saveMdph(testMdph))
    .then(mdph => {
      testMdph = mdph;
      return mdph;
    })
    .then(saveUserAdminMdph())
    .then(user => {
      fakeUserAdminMdph = user;
      tokenAdminMdph = jwt.sign({_id: user._id, role: user.role }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
      return fakeUserAdminMdph;
    })
    .then(saveProfile())
    .then(saveUserAdmin())
    .then(user => {
      fakeUserAdmin = user;
      tokenAdmin = jwt.sign({_id: user._id, role: user.role }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
      return fakeUserAdmin;
    })
    .then(saveProfile())
    .then(saveUser())
    .then(user => {
      fakeUser = user;
      token = jwt.sign({_id: user._id, role: user.role }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
      return fakeUser;
    })
    .then(saveProfile())
    .then(() => {
      return done({
        testMdph,
        fakeUser,
        token,
        fakeUserAdminMdph,
        tokenAdminMdph,
        fakeUserAdmin,
        tokenAdmin
      });
    });

}
