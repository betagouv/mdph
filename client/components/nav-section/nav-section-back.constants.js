'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionBackConstants', [
  {
    sref: 'dashboard.requests',
    include: 'dashboard.requests.**',
    fa: 'fa-folder',
    label: 'Demandes en cours',
  },
  {
    sref: 'dashboard.users',
    include: 'dashboard.users.**',
    fa: 'fa-user',
    label: 'Gestion des utilisateurs'
  },
  {
    sref: 'dashboard.relances',
    include: 'dashboard.relances.**',
    fa: 'fa-envelope',
    label: 'Relances'
  },
  {
    sref: 'dashboard.partenaires',
    include: 'dashboard.partenaires.**',
    fa: 'fa-briefcase',
    label: 'Gestion des partenaires'
  }
]);
