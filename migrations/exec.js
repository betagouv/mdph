'use strict';

import _ from 'lodash';
import User from '../server/api/user/user.model';
import Profile from '../server/api/profile/profile.model';

(function() {
  User
    .find()
    .exec((err, users) => {
      _.forEach(users, function(user) {
        Profile
          .find({user: user._id})
          .exec((err, profiles) => {
            if (profiles.length === 0) {
              console.log('EMAIL', user.email);
              Profile.create({user: user._id});
            }
          });
      });
    });
})();
