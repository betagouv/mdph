'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ContexteCtrl
 * @description
 * # ContexteCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ContexteCtrl', function ($scope) {
    if (angular.isUndefined($scope.data.contexte)) {
      $scope.data.contexte = {};
    }

    $scope.isNextStepDisabled = function(question) {
      return angular.isUndefined($scope.model[question.model]);
    };

    $scope.model = $scope.data.contexte;
  });
