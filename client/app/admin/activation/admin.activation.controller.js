'use strict';

angular.module('impactApp')
  .controller('AdminActivationCtrl', function($scope, $location, $anchorScroll, User) {
    this.searchAndActive = function() {
      User.activate({email:$scope.mail}).$promise.catch(function(res) {
        if(res.status === 200) $scope.message = 'Compte activé';
        if(res.status === 304) $scope.message = 'Compte deja actif';
        if(res.status === 404) $scope.message = 'Compte inconu';
      });
    };
  });
