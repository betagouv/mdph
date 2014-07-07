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
    $scope.question = {
      'title' : 'Votre dossier',
      'answers' : [
        {'label' : 'C\'est votre première demande', 'value' : true},
        {'label' : 'Vous avez déjà un dossier à la MDPH ' + $scope.data.mdph, 'value' : false}
      ]
    };

    $scope.isNextStepDisabled = function() {
      return $scope.question.model === undefined;
    };

    $scope.nextStep = function() {
      $scope.data.nouveauDossier = $scope.question.model;
      if ($scope.data.nouveauDossier) {
        $state.go('q.representant');
      } else {
        $state.go('q.renouvellement');
      }
    };
  });
