'use strict';

angular.module('impactApp').constant('requestSteps', [
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
      },
      {
        name: 'valide',
        isFinal: true
      }
    ]
  },
  {
    id: 'complementaire',
    sref: 'complementaire',
    step: 3,
    label: 'Compléments',
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
    id: 'evaluation',
    sref: 'evaluation',
    step: 4,
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
  },
  {
    id: 'reponse',
    sref: 'reponse',
    step: 5,
    label: 'Votre réponse'
  }
]);
