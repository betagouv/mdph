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
    }

    $scope.model = $scope.sectionModel.codePostal;

    $scope.isNextStepDisabled = function() {
      return !$scope.model.value;
    };

    $scope.nextStep = function() {
      $state.go('^.date_naissance');
    };
  });
