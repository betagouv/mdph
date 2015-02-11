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
    sref: 'dashboard.partenaires.list({status: \'en_attente\'})',
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
