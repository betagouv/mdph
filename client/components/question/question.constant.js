'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('questions', [
  {
    model: 'estRepresentant',
    section: 'contexte',
    titleDefault: 'Pour qui faites vous cette demande ?',
    type: 'radio',
    answers: [
      {
        labelDefault: 'Pour vous',
        value: false,
        documents: [{category: 'obligatoire', id: 'carteIdentite'}]
      },
      {
        labelDefault: 'Pour une autre personne',
        value: true,
        detailUrl: 'components/detail/personne.html',
        documents: [{category: 'obligatoire', id: 'carteIdentite'}, {category: 'obligatoire', id: 'carteIdentiteRepresentant'}],
      }
    ]
  },
  {
    model: 'codePostal',
    section: 'contexte',
    titleDefault: 'Quel est votre code postal ?',
    titleRep: 'Quel est le code postal de <%= name %>?',
    type: 'text'
  },
  {
    model: 'nouveauDossier',
    section: 'contexte',
    titleDefault: 'Est-ce votre premier dossier ?',
    titleRep: 'Est-ce son premier dossier ?',
    type: 'radio',
    answers: [
      {
        labelDefault: 'Oui',
        value: true
      },
      {
        labelDefault: 'Non',
        value: false
      }
    ]
  },
  {
    model: 'numDossier',
    section: 'contexte',
    titleDefault: 'Connaissez-vous votre numéro de dossier ?',
    titleRep: 'Connaissez-vous son numéro de dossier ?',
    answers: [
      {
        labelDefault: 'Oui',
        value: true,
        detailModel: 'numeroDossier',
        detailUrl: 'components/detail/precisez.html',
        detailLabel: 'Numéro'
      },
      {
        labelDefault: 'Non',
        value: false
      }
    ],
  },
  {
    model: 'raison',
    type: 'checkbox',
    titleDefault: 'Quelle est la raison de votre renouvellement ?',
    titleRep: 'Quelle est la raison de son renouvellement ?',
    section: 'contexte',
    answers: [
      {
        labelDefault: 'Vous arrivez à la fin de vos droits',
        labelRep: '<%= name %> arrive à la fin de ses droits',
        model: 'finDeVosDroits'
      },
      {
        labelDefault: 'Votre situation a changé',
        labelRep: 'Sa situation a changé',
        model: 'changementDeSituation'
      }
    ]
  }
]);
