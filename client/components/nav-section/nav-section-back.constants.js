'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionBackConstants', [
  {
    sref: 'dashboard.requests.list.user({userId: \'me\'})',
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
    sref: 'dashboard.preparation_evaluation',
    include: 'dashboard.preparation_evaluation.**',
    fa: 'fa-crosshairs',
    label: 'Préparation à l\'évaluation'
  },
  {
    sref: 'dashboard.dispatch',
    include: 'dashboard.dispatch.**',
    fa: 'fa-code-fork',
    label: 'Dispatch des demandes'
  }
  // {
  //   sref: 'dashboard.simulation',
  //   include: 'dashboard.simulation.**',
  //   fa: 'fa-rocket',
  //   label: 'Simulation'
  // }
]);
