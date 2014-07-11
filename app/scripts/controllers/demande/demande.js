'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DemandeCtrl
 * @description
 * # DemandeCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope) {
    if (angular.isUndefined($scope.data.demande)) {
      $scope.data.demande = {};
    }

    $scope.isNextStepDisabled = function(question) {
      return angular.isUndefined($scope.model[question.model]);
    };

    $scope.model = $scope.data.demande;
  });
