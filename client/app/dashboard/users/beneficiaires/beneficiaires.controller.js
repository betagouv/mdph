'use strict';

angular.module('impactApp')
  .controller('BeneficiairesCtrl', function($scope, User) {
    $scope.search = function(query) {
      User.search({search: query}, function(result) {
        $scope.result = result;
      });
    };

    $scope.confirm = function(user) {
      user.$confirm();
    };
  });
