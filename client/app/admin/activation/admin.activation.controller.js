'use strict';

angular.module('impactApp')
  .controller('AdminActivationCtrl', function($scope, $location, $anchorScroll, User) {
    this.searchAndActive = function() {
      User.activate({email:$scope.mail.toLowerCase()}).$promise
        .then(function() {
          $scope.message = 'Compte activé';
        })
        .catch(function(res) {
          if (res.status === 304) {
            $scope.message = 'Compte deja actif';
          }

          if (res.status === 404) {
            $scope.message = 'Compte inconnu';
          }
        });
    };
  });
