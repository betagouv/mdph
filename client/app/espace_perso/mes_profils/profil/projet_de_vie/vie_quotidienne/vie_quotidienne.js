'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'espace_perso.mes_profils.profil.vie_quotidienne';
    $stateProvider
      .state(index, {
        url: '/vie_quotidienne',
        templateUrl: 'app/espace_perso/mes_profils/profil/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.situation',
        resolve: {
          sections: function($http) {
            return $http.get('/api/sections').then(function(result) {
              return result.data;
            });
          },

          sectionId: function() {
            return 'vie_quotidienne';
          },

          section: function(sections, sectionId) {
            return _.find(sections, {id: sectionId});
          },

          sectionModel: function(profile, sectionId) {
            if (!profile[sectionId]) {
              profile[sectionId] = {};
            }

            return profile[sectionId];
          },

          saveSection: function($window) {
            return function() {
              $window.alert('TODO');
            };
          }
        }
      });
  });
