'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionFrontConstants', [
  {
    sref: 'espace_perso.mes_profils',
    include: 'espace_perso.mes_profils.**',
    fa: 'fa-users',
    label: 'Mes profils',
  },
  {
    sref: 'espace_perso.mon_compte',
    include: 'espace_perso.mon_compte.**',
    fa: 'fa-cogs',
    label: 'Mon compte',
  }
]);
