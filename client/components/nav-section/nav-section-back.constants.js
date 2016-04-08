'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionBackConstants', [
  {
    sref: 'dashboard.workflow',
    include: 'dashboard.workflow.**',
    fa: 'fa-inbox',
    label: 'Flux de demandes'
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
    sref: 'dashboard.documents',
    include: 'dashboard.documents.**',
    fa: 'fa-book',
    label: 'Classement des documents'
  }
]);
