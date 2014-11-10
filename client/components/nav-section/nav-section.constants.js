'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionConstants', [
  {
    sref: 'questionnaire.projet_de_vie.informations.representant',
    include: 'questionnaire.projet_de_vie.informations.*',
    fa: 'fa-user',
    label: 'Informations personnelles',
  },
  {
    sref: 'questionnaire.projet_de_vie.renouvellement.evolution',
    include: 'questionnaire.projet_de_vie.renouvellement.*',
    fa: 'fa-history',
    label: 'Renouvellement',
    renew: true
  },
  {
    sref: 'questionnaire.projet_de_vie.vie_quotidienne.situation.vie_famille',
    include: 'questionnaire.projet_de_vie.vie_quotidienne.**',
    fa: 'fa-home',
    label: 'Vie quotidienne'
  },
  {
    sref: 'questionnaire.projet_de_vie.scolarite',
    include: 'questionnaire.projet_de_vie.scolarite.*',
    fa: 'fa-user',
    label: 'Vie scolaire ou étudiante',
    isOptionnal: true
  },
  {
    sref: 'questionnaire.projet_de_vie.travail',
    include: 'questionnaire.projet_de_vie.travail.*',
    fa: 'fa-briefcase',
    label: 'Vie au travail',
    isOptionnal: true
  },
  {
    sref: 'questionnaire.projet_de_vie.aidant',
    include: 'questionnaire.projet_de_vie.aidant.*',
    fa: 'fa-male',
    label: 'Aidant familial',
    isOptionnal: true,
    isSpecial: true
  }
]);
