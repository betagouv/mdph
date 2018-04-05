'use strict';

import _ from 'lodash';
import Request from '../server/api/request/request.model';
import fs from 'fs';

(function() {
  Request
    .find()
    .lean()
    .exec(function(err, requests) {
      _.forEach(requests, function(request) {
        if (request.data.documents && request.data.documents.length > 0) {
          _.forEach(request.data.documents, function(document) {
            if (!document.filename) {
              return;
            }

            if (!fs.existsSync('../server/uploads/' + document.filename)) {
              if (!request.foundError) {
                console.log('');
                console.log('');
                console.log('Demande');
                console.log('-------');
                console.log('Identifiant: ', request.shortId);
                console.log('Mdph: ', request.mdph);
                console.log('Statut: ', request.status);
                console.log('');
                console.log('Documents manquants');
                console.log('-------------------');
              }

              console.log('Nom: ', document.originalname);
              console.log('Type: ', document.type);

              request.foundError = true;
            }
          });
        }
      });
    });
})();
