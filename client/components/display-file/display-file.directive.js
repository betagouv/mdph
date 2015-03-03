'use strict';

angular.module('impactApp')
  .directive('displayFile', function () {
    return {
      scope: {
        file: '=',
        request: '='
      },
      templateUrl: 'components/display-file/display-file.html',
      controller: function($scope, $http, $cookieStore) {
        $scope.token = $cookieStore.get('token');
        $scope.waiting = true;
        if (typeof $scope.file === 'string') {
          $http.get('/api/requests/' + $scope.request.shortId + '/document/' + $scope.file).then(function(result) {
            $scope.file = result.data;
            $scope.waiting = false;
          });
        } else {
          $scope.waiting = false;
        }
      }
    };
  });
