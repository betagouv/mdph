'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_scolaire';
    $stateProvider
      .state(index, {
        url: '/vie_scolaire',
        templateUrl: 'app/profil/section.html',
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

          sectionModel: function() {
            return {};
          },

          previousModel: function(profile, sectionId) {
            return _.cloneDeep(profile[sectionId]);
          },

          saveSection: function($state, currentUser, profile, sectionId, sectionModel) {
            return function() {
              profile[sectionId] = sectionModel;
              profile.saveSection(sectionId, sectionModel, currentUser, function() {
                $state.go('profil', {}, {reload: true});
              });
            };
          }
        }
      });
  });
