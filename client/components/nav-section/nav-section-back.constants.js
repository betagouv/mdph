'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionBackConstants', [
  {
    sref: 'dashboard.requests.user({userId: \'me\'})',
    include: 'dashboard.requests.**',
    fa: 'fa-folder',
    label: 'Demandes en cours',
  },
  {
    sref: 'dashboard.users.agents',
    include: 'dashboard.users.**',
    fa: 'fa-user',
    label: 'Gestion des utilisateurs'
  },
  {
    sref: 'dashboard.dispatch.secteurs',
    include: 'dashboard.dispatch.**',
    fa: 'fa-code-fork',
    label: 'Dispatch des demandes'
  },

  // {
  //   sref: 'dashboard.preparation_evaluation',
  //   include: 'dashboard.preparation_evaluation.**',
  //   fa: 'fa-crosshairs',
  //   label: 'Préparation à l\'évaluation'
  // },

  {
    sref: 'dashboard.documents.categories',
    include: 'dashboard.documents.**',
    fa: 'fa-book',
    label: 'Classement des documents'
  },

  {
    sref: 'dashboard.espace_perso.mon_compte',
    include: 'dashboard.espace_perso.mon_compte.**',
    fa: 'fa-cogs',
    label: 'Mon compte',
  }
]);
