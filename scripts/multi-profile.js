'use strict';

var _ = require('lodash');
var User = require('../api/user/user.model');
var Profile = require('../api/profile/profile.model');

(function() {
  User
    .find()
    .exec(function(err, users) {
      _.forEach(users, function(user) {
        Profile.find({user: user._id}, function(err, profiles) {
          if (profiles && profiles.length > 1) {
            user.set('isMultiProfiles', true).save();
          }
        });
      });
    });
})();
