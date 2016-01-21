'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'espace_perso.mes_profils.profil.situations_particulieres';
    $stateProvider
      .state(index, {
        url: '/situations_particulieres',
        templateUrl: 'app/espace_perso/mes_profils/profil/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.detail',
        resolve: {
          sections: function($http) {
            return $http.get('/api/sections').then(function(result) {
              return result.data;
            });
          },

          sectionId: function() {
            return 'situations_particulieres';
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
              sectionModel.__completion = true;
              profile[sectionId] = sectionModel;
              profile.$save({userId: currentUser._id}, function() {
                $state.go('espace_perso.mes_profils.profil', {}, {reload: true});
              });
            };
          }
        }
      })
      .state(index + '.detail', {
        url: '',
        templateUrl: 'components/question/checkbox.html',
        controller: 'QuestionCtrl',
        data: {
          hideBack: true,
          isLastQuestion: true
        },
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'urgences', sectionModel);
          },

          nextStep: function(saveSection) {
            return function() {
              saveSection();
            };
          }
        }
      });
  });
