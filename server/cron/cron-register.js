'use strict';

import moment from 'moment';
import config from '../config/environment';
import Request from '../api/request/request.model';
import * as MailActions from '../api/send-mail/send-mail-actions';

const cron = require('node-cron');

const checkRequestExpirationTask = cron.schedule('0 0 * * *', checkRequestExpiration, false);
const checkFirstExpirationNotificationTask = cron.schedule('0 1 * * *', checkFirstExpirationNotification, false);
const checkLastExpirationNotificationTask = cron.schedule('0 2 * * *', checkLastExpirationNotification, false);

if(config.cron.enabled){
  checkRequestExpirationTask.start();
  checkFirstExpirationNotificationTask.start();
  checkLastExpirationNotificationTask.start();
}

export function checkRequestExpiration() {

  console.info('####################################################################################');
  console.info(moment().format('YYYY-MM-DD HH:mm') +' - Lancement de la tache de verification de la fin de validite des demandes');

  const expirationDate = moment().add(-5, 'years').hours(0).minutes(0).seconds(0).milliseconds(0);


  console.info('Recherche des demandes expirées (modifiée après le '+moment(expirationDate).format('YYYY-MM-DD HH:mm') +')');


  // Suppression des demandes expirées (>5ans)
  Request
    .find({
      "updatedAt": {"$lt": expirationDate}
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
            MailActions.sendMailExpiration(data);
          });
          //FIXME - Supprimer aussi les actions ou ajouter une action "suppression" ?
        });
      },
      function(err) {
         if (err) { throw err; }
    });
}

export function checkFirstExpirationNotification() {

  console.info('####################################################################################');
  console.info(moment().format('YYYY-MM-DD HH:mm') +' - Lancement de la tache de premiere notification de fin de validite des demandes');

  const firstExpirationNotificationDate = moment().add(-54, 'months').hours(0).minutes(0).seconds(0).milliseconds(0);

  console.info('Recherche des demandes eligible a la premiere notification (modifiée après le '+moment(firstExpirationNotificationDate).format('YYYY-MM-DD HH:mm') +')');


  // recherche des demandes modifie il y a plus de 54 mois
  Request
    .find({
      "updatedAt": {"$lt": firstExpirationNotificationDate},
      "hasFirstExpirationNotification": false
    })
    .populate('user', 'email')
    .select('shortId user email updatedAt')
    .exec()
    .then(
      function(datas) {
        console.info( datas.length === 0 ? 'Aucune demande eligible' : datas.length+' demandes eligibles');
        datas.forEach(function(data){
          console.info('Notification pour la demande ' + data.shortId );

          Request.update({ shortId : data.shortId }, { $set: { hasFirstExpirationNotification: true }}, function (err) {
            if (err) { throw err; }
            console.info('envoie du mail a l\'utilisateur ' + data.user.email);
            MailActions.sendMailFirstExpirationNotification(data);
          });

          //FIXME - Ajouter une action "premiere relance" ?

          );
        });
      },
      function(err) {
         if (err) { throw err; }
    });
}

export function checkLastExpirationNotification() {

  console.info('####################################################################################');
  console.info(moment().format('YYYY-MM-DD HH:mm') +' - Lancement de la tache de derniere notification de fin de validite des demandes');

  const lastExpirationNotificationDate = moment().add(-59, 'months').hours(0).minutes(0).seconds(0).milliseconds(0);


  console.info('Recherche des demandes eligible a la derniere notification (modifiée après le '+moment(lastExpirationNotificationDate).format('YYYY-MM-DD HH:mm') +')');


  // recherche des demandes modifie il y a plus de 59 mois
  Request
    .find({
      "updatedAt": {"$lt": lastExpirationNotificationDate},
      "hasLastExpirationNotification": false
    })
    .populate('user', 'email')
    .select('shortId user email updatedAt')
    .exec()
    .then(
      function(datas) {
        console.info( datas.length === 0 ? 'Aucune demande eligible' : datas.length+' demandes eligibles');
        datas.forEach(function(data){
          console.info('Notification pour la demande ' + data.shortId );

          Request.update({ shortId : data.shortId }, { $set: { hasLastExpirationNotification: true }}, function (err) {
            if (err) { throw err; }
            console.info('envoie du mail a l\'utilisateur ' + data.user.email);
            MailActions.sendMailLastExpirationNotification(data);
          });

          //FIXME - Ajouter une action "derniere relance" ?
        });
      },
      function(err) {
         if (err) { throw err; }
    });
}
