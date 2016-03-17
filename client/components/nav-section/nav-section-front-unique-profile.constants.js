'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionFrontConstantsUniqueProfile', [
  {
    sref: 'espace_perso.mes_profils.profil({profileId: \'me\'})',
    include: 'espace_perso.mes_profils.profil.**',
    fa: 'fa-user',
    label: 'Mon profil',
  },
  {
    sref: 'espace_perso.mon_compte',
    include: 'espace_perso.mon_compte.**',
    fa: 'fa-cogs',
    label: 'Mon compte',
  }
]);
