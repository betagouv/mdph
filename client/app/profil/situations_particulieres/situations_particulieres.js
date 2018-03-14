'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.situations_particulieres';
    $stateProvider
      .state(index, {
        url: '/situations_particulieres',
        templateUrl: 'app/profil/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.detail',
        authenticate: true,
        authorized: ['user'],
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

          sectionModel: function() {
            return {};
          },

          previousModel: function(profile, sectionId) {
            return _.cloneDeep(profile[sectionId]);
          },

          saveSection: function($state, currentUser, profile, sectionId, sectionModel) {
            return function() {
              profile.saveSection(sectionId, sectionModel, currentUser, function() {
                $state.go('profil.vie_quotidienne');
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
          isFirstQuestion: true,
          isLastQuestion: true
        },
        authenticate: true,
        authorized: ['user'],
        resolve: {
          question: function(QuestionService, section, profile) {
            return QuestionService.get(section, 'urgences', profile);
          },

          nextStep: function(saveSection) {
            return function() {
              saveSection();
            };
          }
        }
      });
  });
