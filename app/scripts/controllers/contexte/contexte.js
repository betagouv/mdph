'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ContexteCtrl
 * @description
 * # ContexteCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ContexteCtrl', function ($rootScope, $sessionStorage, $scope, estRepresentant) {   

    $scope.acceptConditions = false;

    if (angular.isUndefined($sessionStorage.data)) {
      $sessionStorage.data = {
        contexte: {
          sectionLabel: 'Contexte',
          answers: {}
        }
      };
    }

    $scope.estRepresentant = function() {
      return estRepresentant($scope.data.contexte);
    };

    $scope.getLabel = function(answer) {
      if ($scope.estRepresentant() && answer.labelRep) {
        return answer.labelRep;
      }
      return answer.label;
    };

    $scope.broadcastFormTemplate = function() {
      var answers = $scope.sectionModel;
      var formTemplate = [
        {
          section: 'vie_quotidienne',
          sref: 'form.vie_quotidienne.vie_famille',
          label: 'Vie quotidienne',
          filter: 'form.vie_quotidienne.**'
        }
      ];
      if (answers.scolaire && answers.scolaire.value) {
        formTemplate.push({
          section: 'votre_scolarite',
          sref: 'form.votre_scolarite',
          label: 'Vie scolaire ou étudiante',
          filter: 'form.votre_scolarite.**'
        });
      }
      if (answers.travail && answers.travail.value) {
        formTemplate.push({
          section: 'votre_travail',
          sref: 'form.votre_travail',
          label: 'Situation professionnelle',
          filter: 'form.votre_travail.**'
        });
      }
      if (answers.aidant && answers.aidant.value) {
        formTemplate.push({
          section: 'votre_aidant',
          sref: 'form.votre_aidant',
          label: 'Aidant familial',
          filter: 'form.votre_aidant.**'
        });
      }
      formTemplate.push({
        section: 'envoi',
        sref: 'form.envoi',
        label: 'Pièces justificatives',
        filter: 'form.envoi.**'
      });

      $sessionStorage.formTemplate = formTemplate;
    };

    $scope.data = $sessionStorage.data;
    $scope.sectionModel = $scope.data.contexte.answers;
  });
