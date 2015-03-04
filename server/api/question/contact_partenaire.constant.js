'use strict';

/* jshint multistr: true */

exports.all = [
  {
    model: 'typeAidant',
    titleDefault: 'Vous êtes aidé par',
    type: 'radio',
    answers: [
      {
        label: 'Un proche',
        value: 'proche'
      },
      {
        label: 'Une association',
        value: 'association'
      },
      {
        label: 'Un tuteur',
        value: 'tuteur'
      },
      {
        label: 'Un curateur',
        value: 'curateur'
      },
      {
        label: 'Autre',
        value: 'autre'
      }
    ]
  },
  {
    model: 'nomOrganisme',
    titleDefault: 'Nom de l\'organisme',
    type: 'text'
  },
  {
    model: 'nomPersonne',
    titleDefault: 'Nom de la personne',
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
