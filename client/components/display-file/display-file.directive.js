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
        $http.get('/api/requests/' + $scope.request.shortId + '/document/' + $scope.file.gridFile).then(function(result) {
          $scope.gridFileObj = result.data;
        });
      }
    };
  });
