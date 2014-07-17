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
    $scope.title = 'Votre dossier';

    $scope.question = {
      answers: [
        {'label': 'C\'est votre première demande', 'value': true},
        {'label': 'Vous avez déjà un dossier dans cette MDPH', 'value': false}
      ],
      radioModel: ($scope.sectionModel.nouveauDossier) ? $scope.sectionModel.nouveauDossier.value : '',
      setAnswer: function(answer) {
        $scope.sectionModel.nouveauDossier = answer;
        $scope.showDetail(answer.value);
      }
    };

    $scope.radioModel = 'truc';

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
        $state.go('^.representant');
      } else {
        $state.go('^.renouvellement');
      }
    };
  });
