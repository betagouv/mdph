'use strict';

angular.module('impactApp')
  .directive('qtitle', function () {
    return {
      templateUrl: 'components/qtitle/qtitle.html',
      restrict: 'EA',
      controller: function($scope, $http, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.saveForm = function() {
          $http.put('/api/forms/mine', $scope.formAnswers);
        };
      }
    };
  });
