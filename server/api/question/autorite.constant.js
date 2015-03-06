'use strict';

/* jshint multistr: true */

exports.all = [
  {
    model: 'sexe',
    titleDefault: 'Sexe',
    type: 'radio',
    answers: [
      {
        label: 'Féminin',
        model: 'feminin'
      },
      {
        label: 'Masculin',
        model: 'masculin'
      }
    ]
  },
  {
    model: 'nom',
    titleDefault: 'Nom',
    type: 'text'
  },
  {
    model: 'prenom',
    titleDefault: 'Prénom',
    type: 'text'
  },
  {
    model: 'email',
    titleDefault: 'Email',
    type: 'text'
  },
  {
    model: 'birthDate',
    type: 'date',
    titleDefault: 'Date de naissance'
  },
  {
    model: 'adresse',
    titleDefault: 'Adresse',
    type: 'text'
  },
  {
    model: 'adresse_complement',
    titleDefault: 'Complément d\'adresse',
    type: 'text'
  },
  {
    model: 'code_postal',
    titleDefault: 'Code postal',
    type: 'text'
  },
  {
    model: 'commune',
    titleDefault: 'Commune',
    type: 'text'
  },
  {
    model: 'pays',
    titleDefault: 'Pays',
    type: 'text'
  }
];
