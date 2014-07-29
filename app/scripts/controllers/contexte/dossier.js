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
    $scope.subtitle = 'Est-ce votre premier dossier ?';

    $scope.question = {
      model: 'nouveauDossier',
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
    };

    $scope.isNextStepDisabled = function() {
      var answer = $scope.sectionModel[$scope.question.model];
      return angular.isUndefined(answer.value);
    };

    $scope.nextStep = function() {
      var answer = $scope.sectionModel[$scope.question.model];
      if (answer.value) {
        $state.go('^.code_postal');
      } else {
        $state.go('^.renouvellement');
      }
    };
  });
