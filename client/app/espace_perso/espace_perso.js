'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('espace_perso', {
        url: '/espace_perso',
        parent: 'departement',
        templateUrl: 'app/espace_perso/espace_perso.html',
        controller: 'EspacePersoCtrl',
        authenticate: true,
        resolve: {
          sections: function(SectionFrontConstants, SectionFrontConstantsUniqueProfile, currentUser) {
            if (currentUser.isMultiProfiles) {
              return SectionFrontConstants;
            } else {
              return SectionFrontConstantsUniqueProfile;
            }
          },

          currentUser: function(Auth) {
            return Auth.getCurrentUser();
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
