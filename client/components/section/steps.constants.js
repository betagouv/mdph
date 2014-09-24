'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('formSteps', [
  {
    id: 'questionnaire',
    step: 0,
    sref: 'demande.recapitulatif',
    label: 'Questionnaire',
    isEnabled: true
  },
  {
    id: 'obligatoire',
    step: 1,
    sref: 'demande.pieces_obligatoires',
    span: 'A',
    label: 'Pièces obligatoires',
    isEnabled: false
  },
  {
    id: 'preevaluation',
    step: 2,
    sref: 'demande.pre_evaluation',
    span: 'B',
    label: 'Pré-évaluation',
    isEnabled: false
  },
  {
    id: 'complementaire',
    step: 3,
    sref: 'demande.pieces_complementaires',
    span: 'B',
    label: 'Compléments',
    isEnabled: false
  },
  {
    id: 'evaluation',
    step: 4,
    sref: 'demande.evaluation',
    span: 'C',
    label: 'Evaluation',
    isEnabled: false
  },
  {
    id: 'reponse',
    step: 5,
    sref: 'demande.reponse',
    span: 'C',
    label: 'Votre réponse',
    isEnabled: false
  }
]);
