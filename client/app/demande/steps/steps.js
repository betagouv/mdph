'use strict';

angular.module('impactApp')
  .factory('SectionUtils', function SectionUtils() {
    return {
      resolveSaveSection: function(sectionModel, updateRequest) {
        return function() {
          sectionModel.__completion = true;
          updateRequest();
        };
      },
      resolveSectionModel: function(request, section) {
          if (typeof request.formAnswers[section.id] === 'undefined') {
            request.formAnswers[section.id] = {};
          }
          return request.formAnswers[section.id];
      }
    };
  })
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.demande.obligatoires', {
        url: '/obligatoires',
        templateUrl: 'app/demande/steps/obligatoires/obligatoires.html'
      })
      .state('departement.demande.complementaires', {
        url: '/complementaires',
        templateUrl: 'app/demande/steps/complementaires/complementaires.html'
      })
      .state('departement.demande.complements', {
        url: '/complements',
        templateUrl: 'app/demande/steps/complements/complements.html'
      })
      .state('departement.demande.documents_lies', {
        url: '/documents_lies',
        templateUrl: 'app/demande/steps/documents_lies/documents_lies.html'
      });
  });
