'use strict';

import _ from 'lodash';
import User from '../server/api/user/user.model';
import Profile from '../server/api/profile/profile.model';

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
