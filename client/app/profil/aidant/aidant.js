'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.aidant';
    $stateProvider
      .state(index, {
        url: '/aidant',
        templateUrl: 'app/profil/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.situation.nom_aidant',
        resolve: {
          sectionId: function() {
            return 'aidant';
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
                if (profile.identites.beneficiaire.protection === 'Oui') {
                  $state.go('profil.representant');
                } else {
                  $state.go('profil.situations_particulieres');
                }
              });
            };
          }
        },
        data: {
          history: []
        }
      });
  });
