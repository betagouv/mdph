'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'espace_perso.mes_profils.profil.vie_scolaire';
    $stateProvider
      .state(index, {
        url: '/vie_scolaire',
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
            return 'vie_scolaire';
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

          saveSection: function($state, currentUser, profile, sectionId, sectionModel) {
            return function() {
              profile[sectionId] = sectionModel;
              profile.$save({userId: currentUser._id}, function() {
                $state.go('espace_perso.mes_profils.profil', {}, {reload: true});
              });
            };
          }
        }
      });
  });
