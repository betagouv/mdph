'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'demande.situations_particulieres';
    $stateProvider
      .state(index, {
        url: '/situations_particulieres',
        templateUrl: 'app/demande/demande.section.html',
        controller: 'DemandeSectionCtrl',
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

          previousModel: function(demande, sectionId) {
            return _.cloneDeep(demande.data[sectionId]);
          },

          saveSection: function($state, RequestResource, currentUser, demande, sectionId, sectionModel) {
            return function() {
              sectionModel.__completion = true;
              sectionModel.updatedAt = Date.now();
              demande.data[sectionId] = sectionModel;
              RequestResource.update(demande).$promise.then(function() {
                $state.go('demande.vie_quotidienne');
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
          question: function(QuestionService, section, demande) {
            return QuestionService.get(section, 'urgences', demande);
          },

          nextStep: function(saveSection) {
            return function() {
              saveSection();
            };
          }
        }
      });
  });
