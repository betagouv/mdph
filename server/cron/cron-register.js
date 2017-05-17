'use strict';

import moment from 'moment';
import config from '../config/environment';
import Request from '../api/request/request.model';
import * as MailActions from '../api/send-mail/send-mail-actions';

const cron = require('node-cron');

const checkRequestValidityTask = cron.schedule('0 0 * * *', checkRequestValidity, true);

export function checkRequestValidity() {

  console.info('####################################################################################');
  console.info(moment().format('YYYY-MM-DD HH:mm') +' - Lancement de la tache de verification de la validite des documents');

  const expiredDate = moment().add(-5, 'years').hours(0).minutes(0).seconds(0).milliseconds(0);


  console.info('Recherche des demandes expirées (modifiée après le '+moment(expiredDate).format('YYYY-MM-DD HH:mm') +')');


  // Suppression des demandes expirées (>5ans)
  Request
    .find({
      "updatedAt": {"$lt": expiredDate}
    })
    .populate('user', 'email')
    .select('shortId user email updatedAt')
    .exec()
    .then(
      function(datas) {
        console.info( datas.length === 0 ? 'Aucune demande expirée' : datas.length+' demandes expirées');
        datas.forEach(function(data){
          console.info('suppression de la demande ' + data.shortId );
          Request.remove({ shortId : data.shortId }, function (err) {
            if (err) { throw err; }
            console.info('envoie du mail a l\'utilisateur ' + data.user.email);
            MailActions.sendMailExpired(data);
          });
          //FIXME - Supprimer aussi les actions ou ajouter une action "suppression" ?
        });
      },
      function(err) {
         if (err) { throw err; }
    });
}

if(config.cron.enabled){
  checkRequestValidityTask.start();
}
