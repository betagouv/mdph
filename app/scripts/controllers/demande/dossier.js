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
      'model': 'nouveauDossier',
      'answers': [
        {'label': 'C\'est votre première demande', 'value': true},
        {'label': 'Vous avez déjà un dossier à la MDPH ' + $scope.data.mdph, 'value': false}
      ]
    };

    $scope.nextStep = function() {
      if ($scope.model.nouveauDossier) {
        $state.go('form.demande.representant');
      } else {
        $state.go('form.demande.renouvellement');
      }
    };
  });
