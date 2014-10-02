'use strict';

angular.module('impactApp').constant('formSteps', [
  {
    id: 'questionnaire',
    sref: 'questionnaire',
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
    sref: 'obligatoire',
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
    id: 'preevaluation',
    sref: 'preevaluation',
    step: 2,
    label: 'Pré-évaluation',
    states: [
      {
        name: 'en_cours'
      }
    ]
  },
  {
    id: 'complementaire',
    sref: 'complementaire',
    step: 3,
    label: 'Compléments'
  },
  {
    id: 'evaluation',
    step: 4,
    label: 'Evaluation'
  },
  {
    id: 'reponse',
    sref: 'reponse',
    step: 5,
    label: 'Votre réponse'
  }
]);
