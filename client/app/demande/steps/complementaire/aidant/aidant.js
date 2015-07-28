'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'departement.demande.complementaire.aidant';
    $stateProvider
      .state(index, {
        url: '/aidant',
        templateUrl: 'app/demande/steps/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.situation.nom_aidant',
        resolve: {
          section: function(sections) {
            return _.find(sections, {id: 'aidant'});
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
