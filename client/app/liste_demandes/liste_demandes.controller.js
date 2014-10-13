'use strict';

angular.module('impactApp')
  .controller('ListeDemandesCtrl', function ($scope, requests) {
    $scope.requests = requests;
  });
