'use strict';

angular.module('impactApp').constant('requestSteps', [
  {
    id: 'questionnaire',
    sref: '.questionnaire',
    step: 0,
    label: 'Questionnaire',
    isEnabled: true,
    states: [
      {
        name: 'en_cours'
      },
      {
        name: 'complet',
        isFinal: true
      }
    ]
  },
  {
    id: 'obligatoire',
    sref: '.obligatoire',
    step: 1,
    label: 'Pièces obligatoires',
    states: [
      {
        name: 'en_cours'
      },
      {
        name: 'a_valider',
        isFinal: true
      },
      {
        name: 'valide',
        isFinal: true
      },
      {
        name: 'erreur'
      }
    ]
  },
  {
    id: 'complementaire',
    sref: '.complementaire',
    step: 2,
    label: 'Compléments',
    states: [
      {
        name: 'pre_evaluation'
      },
      {
        name: 'en_cours'
      },
      {
        name: 'a_valider',
        isFinal: true
      },
      {
        name: 'valide',
        isFinal: true
      },
      {
        name: 'erreur'
      }
    ]
  },
  {
    id: 'evaluation',
    sref: '.evaluation',
    step: 3,
    label: 'Evaluation',
    states: [
      {
        name: 'en_cours'
      },
      {
        name: 'valide',
        isFinal: true
      }
    ]
  }
]);
