'use strict';

angular.module('impactApp')
  .controller('ConfirmerMailCtrl', function($scope, $state, $interval, $stateParams, $http, currentUser) {
    $http.post('/api/users/' + $stateParams.userId + '/confirmer_mail/' + $stateParams.newMailToken).then(function() {
      currentUser.unconfirmed = false;
    }).catch(function(res) {
      if (res.status !== undefined) {
        $scope.error = true;
      }
    });
  });
