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
    
    $scope.title = ($scope.estRepresentant()) ? 'Quel est son code postal ?' : 'Quel est votre code postal ?';

    if (angular.isUndefined($scope.sectionModel.codePostal)) {
      $scope.sectionModel.codePostal = {label: 'Code postal', value: ''};
    }

    $scope.model = $scope.sectionModel.codePostal;

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.model.value);
    };

    $scope.nextStep = function() {
      $state.go('^.date_naissance');
    };
  });
