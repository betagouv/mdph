'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionBackConstants', [
  {
    sref: 'dashboard.requests.list({userId: \'me\'})',
    include: 'dashboard.requests.**',
    fa: 'fa-folder',
    label: 'Demandes en cours',
  },
  {
    sref: 'dashboard.repartition_demandes',
    include: 'dashboard.repartition_demandes.**',
    fa: 'fa-pie-chart',
    label: 'Mes demandes'
  },
  {
    sref: 'dashboard.partenaires',
    include: 'dashboard.partenaires.**',
    fa: 'fa-briefcase',
    label: 'Gestion des partenaires'
  },
  {
    sref: 'dashboard.users',
    include: 'dashboard.users.**',
    fa: 'fa-user',
    label: 'Gestion des utilisateurs'
  },
  {
    sref: 'dashboard.simulation',
    include: 'dashboard.simulation.**',
    fa: 'fa-rocket',
    label: 'Simulation'
  }
]);
