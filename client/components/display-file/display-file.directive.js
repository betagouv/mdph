'use strict';

angular.module('impactApp')
  .directive('displayFile', function($state) {
    return {
      scope: {
        file: '=',
        request: '='
      },
      templateUrl: 'components/display-file/display-file.html',
      controller: function($scope, $http, $cookies) {
        $scope.token = $cookies.get('token');

        if ($scope.file.partenaire) {
          $http.get('/api/partenaires/' + $scope.file.partenaire).then(function(result) {
            $scope.partenaireObj = result.data;
          });
        }

        $scope.delete = function() {
          $http.delete('/api/requests/' + $scope.request.shortId + '/document/' + $scope.file._id).success(function() {
            $state.go($state.current, {}, {reload: true});
          });
        };
      }
    };
  });
