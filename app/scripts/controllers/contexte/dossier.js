'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DossierCtrl
 * @description
 * # DossierCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DossierCtrl', function($scope, $state) {
    $scope.title = 'Dossier MDPH';

    $scope.question = {
      answers: [
        {
          'label': 'C\'est votre première demande',
          'labelRep': 'C\'est le premier dossier du demandeur',
          'value': true
        },
        {
          'label': 'Vous avez déjà un dossier',
          'labelRep': 'Il a déjà un dossier',
          'value': false
        }
      ],
      radioModel: ($scope.sectionModel.nouveauDossier) ? $scope.sectionModel.nouveauDossier.value : '',
      setAnswer: function(answer) {
        $scope.sectionModel.nouveauDossier = answer;
        $scope.showDetail(answer.value);
      }
    };

    $scope.showDetail = function(value) {
      if (value === false && angular.isDefined($scope.sectionModel.changementDeSituation)) {
        delete $scope.sectionModel.changementDeSituation;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.nouveauDossier);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.nouveauDossier.value) {
        $state.go('^.code_postal');
      } else {
        $state.go('^.renouvellement');
      }
    };
  });
