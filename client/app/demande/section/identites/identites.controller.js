'use strict';

angular.module('impactApp')
  .controller('IdentitesCtrl', function($scope, request) {
    $scope.request = request;

    $scope.beneficiaire = request.beneficiaire ? request.beneficiaire : {};
    $scope.aidantDemarche = request.aidantDemarche ? request.aidantDemarche : {};
    $scope.autorite = request.autorite ? request.autorite : {};
  });
