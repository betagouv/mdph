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
    $scope.title = $scope.estRepresentant() ? 'Est-ce le premier dossier de ' + $scope.getName() + ' ?' : 'Est-ce votre premier dossier ?';

    $scope.question = {
      answers: [
        {
          'label': 'Oui',
          'value': true
        },
        {
          'label': 'Non',
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
