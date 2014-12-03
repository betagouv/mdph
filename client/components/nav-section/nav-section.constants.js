'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionConstants', [
  {
    id: 'contexte',
    sref: 'questionnaire.projet_de_vie.informations.representant',
    include: 'questionnaire.projet_de_vie.informations.*',
    fa: 'fa-user',
    label: 'Informations personnelles',
  },
  {
    id: 'renouvellement',
    sref: 'questionnaire.projet_de_vie.renouvellement.evolution',
    include: 'questionnaire.projet_de_vie.renouvellement.*',
    fa: 'fa-history',
    label: 'Renouvellement',
    renew: true
  },
  {
    id: 'vieQuotidienne',
    sref: 'questionnaire.projet_de_vie.vie_quotidienne.situation.vie_famille',
    include: 'questionnaire.projet_de_vie.vie_quotidienne.**',
    fa: 'fa-home',
    label: 'Vie quotidienne'
  },
  {
    id: 'scolaire',
    sref: 'questionnaire.projet_de_vie.scolarite.situation.condition',
    include: 'questionnaire.projet_de_vie.scolarite.**',
    fa: 'fa-user',
    label: 'Vie scolaire ou étudiante',
    isOptionnal: true
  },
  {
    id: 'travail',
    sref: 'questionnaire.projet_de_vie.travail.situation_professionnelle.condition',
    include: 'questionnaire.projet_de_vie.travail.**',
    fa: 'fa-briefcase',
    label: 'Vie au travail',
    isOptionnal: true
  },
  {
    id: 'aidant',
    sref: 'questionnaire.projet_de_vie.aidant.condition',
    include: 'questionnaire.projet_de_vie.aidant.**',
    fa: 'fa-male',
    label: 'Aidant familial',
    isOptionnal: true
  },
  {
    id: 'envoi',
    sref: 'questionnaire.projet_de_vie.envoi',
    include: 'questionnaire.projet_de_vie.envoi',
    fa: 'fa-send',
    label: 'Envoi',
    isSend: true
  }
]);
