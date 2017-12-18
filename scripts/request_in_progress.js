'use strict';

import _ from 'lodash';
import fs from 'fs';
import moment from 'moment';
import mongoose from 'mongoose';
import Demande from '../server/api/request/request.model';


(function() {
  console.log('###########################################################################');
  Demande.aggregate([
    { $match: { $or: [ { status: 'en_attente_usager' }, { status: 'emise' } ]} },
    { $lookup:
      {
         from: 'users',
         localField: 'user',
         foreignField: '_id',
         as: 'user_join'
       }
    },
    { $sort: { mdph: -1 } }
  ], function (err, result) {
      if (err) {
          next(err);
      } else {
        let writeStream = fs.createWriteStream('./result.csv');
        writeStream.write('mdph;status;dossier;mail;date modification;date creation\n');
        result.forEach(function(element) {
          var mdph = element.mdph ? element.mdph : 'non defini';
          var status = element.status;
          var dossier = element.shortId ? element.shortId : '';
          var mail = element.user_join[0] ? element.user_join[0].email : '';
          var updatedDate = moment(element.updatedAt).format('DD/MM/YYYY');
          var createDate = moment(element.createdAt).format('DD/MM/YYYY');

          var line = mdph + ';' + status + ';' + dossier + ';' + mail + ';' + updatedDate + ';' + createDate;
          console.log(line);
          writeStream.write(line + '\n');
        });
        writeStream.end();
        console.log('FINISH!');
      }
  });
})();
