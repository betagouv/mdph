'use strict';

//A lancer avec run.js

import _ from 'lodash';
import Request from '../../server/api/request/request.model';
import Profile from '../../server/api/profile/profile.model';
import mongoose from 'mongoose';

var Schema = mongoose.Schema;

(function() {
  console.log('STATS');

  Request.count({}, function (err, count) {
    if(err){
      console.log(err);
    }
    console.log('%d demandes', count);
  });

  Profile.count({}, function (err, count) {
    if(err){
      console.log(err);
    }
    console.log('%d profils', count);
  });

})();



