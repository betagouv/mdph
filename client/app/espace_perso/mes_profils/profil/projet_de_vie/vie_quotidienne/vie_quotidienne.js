'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'espace_perso.mes_profils.profil.vie_quotidienne';
    $stateProvider
      .state(index, {
        url: '/vie_quotidienne',
        templateUrl: 'app/demande/steps/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.situation',
        resolve: {
          sections: function($http) {
            return $http.get('/api/sections').then(function(result) {
              return result.data;
            });
          },

          section: function(sections) {
            return _.find(sections, {id: 'vie_quotidienne'});
          },

          sectionModel: function() {
            return {};
          },

          saveSection: function() {
            return function() {};
          }
        }
      });
  });
