'use strict';

//A lancer avec run.js

import _ from 'lodash';
import Mdph from '../../server/api/mdph/mdph.model';
import Request from '../../server/api/request/request.model';
import Profile from '../../server/api/profile/profile.model';
import mongoose from 'mongoose';

var Schema = mongoose.Schema;

(function() {
  console.log('SUPPRESSION DES DEMANDES ET DES PROFILS DES MDPH FERMEES');

  Mdph.find({})
    .exec(function(err, mdphs) {

      if (err) {
        console.log(err);
        return;
      }

      _.forEach(mdphs, function(mdph) {

        if(!mdph.opened){
          var count = 0;
          Request
          .find({ mdph: mdph.zipcode})
          .exec(function(err, requests) {

            if (err) {
              console.log(err);
              return;
            }

            _.forEach(requests, function(request) {
              request.remove();
              count++;
            });

            console.log(' %s demandes supprimées pour la MDPH %s (%s)', count, mdph.name, mdph.zipcode);
          });
        }
      });

      console.log('FINISH!');
    });
})();



