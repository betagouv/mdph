'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:CodePostalCtrl
 * @description
 * # CodePostalCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('CodePostalCtrl', function($scope, $state) {
    
    $scope.title = ($scope.estRepresentant()) ? 'Code postal du demandeur' : 'Votre code postal';

    if (angular.isUndefined($scope.sectionModel.codePostal)) {
      $scope.sectionModel.codePostal = {label: 'Code postal', value: ''};
      $scope.sectionModel.mdph = {label: 'MDPH', value: ''};
    }

    $scope.model = $scope.sectionModel.codePostal;
    $scope.mdph = $scope.sectionModel.mdph;

    $scope.findMdph = function() {
      if (angular.isDefined($scope.model.value)) {
        if ($scope.model.value.indexOf('14') === 0) {
          $scope.mdph.value = 'Votre demande sera dirigée vers la MDPH du 14, Calvados.';
        } else if ($scope.model.value.indexOf('59') === 0) {
          $scope.mdph.value = 'Votre demande sera dirigée vers la MDPH du 59, Nord.';
        } else {
          $scope.mdph.value = 'Ce département ne participe pas à l\'expérimentation de formulaire en ligne. Vous pourrez imprimer votre demande et l\'envoyer par courrier.';
        }
      } else {
        $scope.mdph.value = '';
      }      
    };

    $scope.isNextStepDisabled = function() {
      return !$scope.model.value;
    };

    $scope.nextStep = function() {
      $state.go('^.date_naissance');
    };
  });
