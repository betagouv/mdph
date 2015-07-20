'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('allSteps', [
  {
    id: 'obligatoire',
    mandatory: true,
    label: 'Renseignements obligatoires',
    desc: 'Renseignements obligatoires pour votre demande',
    sections: ['identites', 'situations_particulieres', 'vie_quotidienne'],
    next: {
      id: 'complementaire',
      label: 'Renseignements complémentaires'
    },
    template: 'section-list.html',
    controller: 'StepCtrl'
  },
  {
    id: 'complementaire',
    mandatory: false,
    label: 'Renseignements complémentaires',
    desc: 'Renseignements complémentaires, en fonction de votre situation',
    sections: ['vie_scolaire', 'vie_au_travail', 'aidant'],
    previous: {
      id: 'obligatoire',
      label: 'Renseignements obligatoires'
    },
    next: {
      id: 'documents',
      label: 'Documents liés'
    },
    template: 'section-list.html',
    controller: 'StepCtrl'
  },
  {
    id: 'documents',
    mandatory: true,
    label: 'Documents liés',
    desc: 'Pour nous transmettres les documents justificatifs obligatoires et complémentaires',
    sections: ['documents'],
    previous: {
      id: 'complementaire',
      label: 'Renseignements complémentaires'
    },
    next: {
      id: 'envoi',
      label: 'Envoi'
    },
    template: 'section-document.html',
    controller: 'DocumentsCtrl'
  },
  {
    id: 'envoi',
    mandatory: true,
    label: 'Envoi',
    desc: 'Transmission de votre demande à la MDPH',
    previous: 'documents',
    template: 'section-envoi.html',
    controller: 'FinalStepCtrl'
  }
]);
