'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'departement.demande.complementaire.vie_scolaire';
    $stateProvider
      .state(index, {
        url: '/vie_scolaire',
        templateUrl: 'app/demande/steps/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.situation',
        resolve: {
          section: function(sections) {
            return _.find(sections, {id: 'vie_scolaire'});
          },

          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },

          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      });
  });
