import User from '../../api/user/user.model';
import Profile from '../../api/profile/profile.model';
import Mdph from '../../api/mdph/mdph.model';

import jwt from 'jsonwebtoken';
import config from '../../config/environment';

function saveMdph(mdph) {
  return function() {
    var test = new Mdph({zipcode: 'test'});
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
      role: 'user'
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
      mdph: testMdph._id
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
      role: 'admin'
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
