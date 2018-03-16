'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_au_travail';
    $stateProvider
      .state(index, {
        url: '/vie_au_travail',
        templateUrl: 'app/profil/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.situation_professionnelle.condition',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          sectionId: function() {
            return 'vie_au_travail';
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
              profile.saveSection(sectionId, sectionModel, currentUser, function() {
                $state.go('profil', {}, {reload: true});
              });
            };
          }
        },
        data: {
          history: []
        }
      });
  });
