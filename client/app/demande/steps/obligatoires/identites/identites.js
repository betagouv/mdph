'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.obligatoires.identites';
    $stateProvider
      .state(index, {
        url: '/identites',
        templateUrl: 'app/demande/steps/obligatoires/identites/identites.html',
        controller: 'IdentitesCtrl',
        resolve: {
          section: function(sections) {
            return _.find(sections, {id: 'identites'});
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state(index + '.modification_identite', {
        url: '/:type?id',
        template: '<identity-form id="currentId" type="type" submit="submit" section="section" identite="tempIdentite"/>',
        resolve: {
          submit: function($state, IdentiteService, sectionModel, tempIdentite, type, currentId) {
            return function(form) {
              if (form.$invalid) {
                form.showError = true;
              } else {
                IdentiteService.mergeModifications(type, sectionModel, currentId, tempIdentite);
                $state.go('^');
              }
            };
          },
          type: function($stateParams) {
            return $stateParams.type;
          },
          currentId: function($stateParams, type) {
            var id = $stateParams.id;
            if (!id && type === 'autorite') {
              return 'parent1';
            }
            return $stateParams.id;
          },
          identite: function(IdentiteService, type, sectionModel, currentId){
            return IdentiteService.getIdentite(type, sectionModel, currentId);
          },
          tempIdentite: function(identite) {
            return _.clone(identite, true);
          }
        },
        controller: function($scope, type, tempIdentite, submit, currentId){
          $scope.tempIdentite = tempIdentite;
          $scope.type = type;
          $scope.currentId = currentId;
          $scope.submit = submit;
        }
      });
  });
