'use strict';

import _ from 'lodash';
import Request from '../api/request/request.model';
import Synthese from '../api/synthese/synthese.model';

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
