'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'espace_perso.mes_profils.profil.vie_au_travail';
    $stateProvider
      .state(index, {
        url: '/vie_au_travail',
        templateUrl: 'app/espace_perso/mes_profils/profil/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.situation_professionnelle.condition',
        resolve: {
          sectionId: function() {
            return 'vie_au_travail';
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
              sectionModel.__completion = true;
              profile.$save({userId: currentUser._id}, function() {
                $state.go('espace_perso.mes_profils.profil', {}, {reload: true});
              });
            };
          }
        }
      });
  });
