'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.complementaire.vie_au_travail';
    $stateProvider
      .state(index, {
        url: '/vie_au_travail',
        templateUrl: 'app/demande/steps/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.situation_professionnelle.condition',
        resolve: {
          section: function(sections) {
            return _.find(sections, {id: 'vie_au_travail'});
          },
          sectionModel: function(request) {
            return request.formAnswers.vie_au_travail;
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      });
  });
