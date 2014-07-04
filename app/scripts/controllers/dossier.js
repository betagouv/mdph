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
    $scope.nextStep = function() {
      if ($scope.data.nouveauDossier) {
        $state.go('q.representant');
      } else {
        $state.go('q.renouvellement');
      }
    };
  });
