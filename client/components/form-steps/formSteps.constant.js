'use strict';

angular.module('impactApp').constant('formSteps', [
  {
    id: 'questionnaire',
    step: 0,
    sref: 'demande.recapitulatif',
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
    step: 1,
    sref: 'demande.pieces_obligatoires',
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
    step: 2,
    sref: 'demande.pre_evaluation',
    label: 'Pré-évaluation'
  },
  {
    id: 'complementaire',
    step: 3,
    sref: 'demande.pieces_complementaires',
    label: 'Compléments'
  },
  {
    id: 'evaluation',
    step: 4,
    sref: 'demande.evaluation',
    label: 'Evaluation'
  },
  {
    id: 'reponse',
    step: 5,
    sref: 'demande.reponse',
    label: 'Votre réponse'
  }
]);
