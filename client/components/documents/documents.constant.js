'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('documents', [
  {
    id: 'certificatMedical',
    label: 'Certificat médical',
    type: 'obligatoire',
    desc: 'Un certificat médical de moins de 3 mois',
    show: true
  },
  {
    id: 'carteIdentite',
    label: 'Carte d\'identité',
    type: 'obligatoire',
    desc: 'Une photocopie recto/verso de la carte d\'identité du demandeur',
    show: true
  }
]);
