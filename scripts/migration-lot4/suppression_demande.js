'use strict';

import _ from 'lodash';
import Request from '../../server/api/request/request.model';
import fs from 'fs';

(function() {

  // Request
  //   .find({$or: [ {status: {$eq: 'enregistree'}}, {status: {$eq: 'archive'}}]})
  //   .exec(function(err, requests) {

  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     requests.forEach(function(request, index) {
  //         console.log("request : ", request);
  //     });

  //   });

  Request
  .find({})
  .exec(function(err, requests) {

    if (err) {
      console.log(err);
      return;
    }
    requests.forEach(function(request, index) {
        console.log("request : ", request);
    });

  });
})();
