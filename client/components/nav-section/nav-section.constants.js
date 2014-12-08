'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionConstants', [
  {
    id: 'contexte',
    sref: 'departement.questionnaire.projet_de_vie.informations.representant',
    include: 'departement.questionnaire.projet_de_vie.informations.*',
    fa: 'fa-user',
    label: 'Informations personnelles',
  },
  {
    id: 'renouvellement',
    sref: 'departement.questionnaire.projet_de_vie.renouvellement.evolution',
    include: 'departement.questionnaire.projet_de_vie.renouvellement.*',
    fa: 'fa-history',
    label: 'Renouvellement',
    renew: true
  },
  {
    id: 'vieQuotidienne',
    sref: 'departement.questionnaire.projet_de_vie.vie_quotidienne.situation.vie_famille',
    include: 'departement.questionnaire.projet_de_vie.vie_quotidienne.**',
    fa: 'fa-home',
    label: 'Vie quotidienne'
  },
  {
    id: 'scolaire',
    sref: 'departement.questionnaire.projet_de_vie.scolarite.situation.condition',
    include: 'departement.questionnaire.projet_de_vie.scolarite.**',
    fa: 'fa-user',
    label: 'Vie scolaire ou étudiante',
    isOptionnal: true
  },
  {
    id: 'travail',
    sref: 'departement.questionnaire.projet_de_vie.travail.situation_professionnelle.condition',
    include: 'departement.questionnaire.projet_de_vie.travail.**',
    fa: 'fa-briefcase',
    label: 'Vie au travail',
    isOptionnal: true
  },
  {
    id: 'aidant',
    sref: 'departement.questionnaire.projet_de_vie.aidant.condition',
    include: 'departement.questionnaire.projet_de_vie.aidant.**',
    fa: 'fa-male',
    label: 'Aidant familial',
    isOptionnal: true
  },
  {
    id: 'envoi',
    sref: 'departement.questionnaire.projet_de_vie.envoi',
    include: 'departement.questionnaire.projet_de_vie.envoi',
    fa: 'fa-send',
    label: 'Envoi',
    isSend: true
  }
]);
