'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('espace_perso', {
        url: '/espace_perso',
        templateUrl: 'app/espace_perso/espace_perso.html',
        controller: 'EspacePersoCtrl',
        authenticate: true,
        resolve: {
          sections: function(SectionFrontConstants) {
            return SectionFrontConstants;
          }
        },
        abstract: true
      })
      .state('dashboard.espace_perso', {
        url: '/espace_perso',
        template: '<ui-view></ui-view>',
        controller: 'EspacePersoCtrl',
        authenticate: true,
        resolve: {
          sections: function(SectionBackConstants) {
            return SectionBackConstants;
          }
        },
        abstract: true
      });
  });
