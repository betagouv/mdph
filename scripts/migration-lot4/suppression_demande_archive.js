'use strict';

//A lancer avec run.js

import _ from 'lodash';
import Request from '../../server/api/request/request.model';
import mongoose from 'mongoose';

var Schema = mongoose.Schema;

(function() {
  console.log('SUPPRESSION DES DEMANDES');
  var count = 0;
  Request
    .find({deletedAt: { $exists: false }})
    .exec(function(err, requests) {

      if (err) {
        console.log(err);
        return;
      }

      _.forEach(requests, function(request) {

        if(request.status != 'en_cours' && request.status != 'emise' && request.status != 'validee' && request.status != 'en_attente_usager' && request.status != 'irrecevable'){
            request.remove();
            count++;
        }
      });

      console.log(count + ' demandes supprimées');
      console.log('FINISH!');
    });
})();



