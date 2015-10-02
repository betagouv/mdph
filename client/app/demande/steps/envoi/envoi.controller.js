'use strict';

angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, step, request, $sce, recapitulatif) {
    $scope.request = request;
    $scope.step = step;

    $scope.recapitulatifHtml = $sce.trustAsHtml(recapitulatif);
  });
