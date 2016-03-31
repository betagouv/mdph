'use strict';

var _ = require('lodash');
var Request = require('../api/request/request.model');
var Profile = require('../api/profile/profile.model');
var Synthese = require('../api/synthese/synthese.model');

//migrate request.synthese to synthese

(function() {
  Request
    .find()
    .exec(function(err, requests) {
      _.forEach(requests, function(request) {
        if (request.synthese && request.synthese.geva) {
          var newSynthese = new Synthese({
            user: request.user,
            profile: request.profile,
            request: request._id,
            geva: request.synthese.geva
          });

          newSynthese.save();
        }
      });

      console.log('FINISH!');
    });
})();
