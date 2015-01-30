'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionFrontConstants', [
  {
    sref: 'espace_perso.mon_compte',
    include: 'espace_perso.mon_compte.**',
    fa: 'fa-cogs',
    label: 'Mon compte',
  },
  {
    sref: 'espace_perso.liste_demandes',
    include: 'espace_perso.liste_demandes.**',
    fa: 'fa-folder',
    label: 'Mes demandes'
  }
]);
