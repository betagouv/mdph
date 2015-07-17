'use strict';

angular.module('impactApp')
  .controller('HeaderCtrl', function ($scope, $cookieStore) {
    $scope.token = $cookieStore.get('token');
  });
