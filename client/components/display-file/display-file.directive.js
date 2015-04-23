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

        if ($scope.file.partenaire) {
          $http.get('/api/partenaires/' + $scope.file.partenaire).then(function(result) {
            $scope.partenaireObj = result.data;
          });
        }
      }
    };
  });
