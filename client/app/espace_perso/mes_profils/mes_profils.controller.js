'use strict';

angular.module('impactApp').controller('MesProfilsCtrl', function($scope, $state, ProfileResource, currentUser) {
  $scope.profiles = ProfileResource.query({userId: currentUser._id});

  $scope.addProfile = function() {
    var newProfile = new ProfileResource();
    newProfile.$save({userId: currentUser._id}, function(result) {
      $state.go('.profil', {profileId: result._id});
      $scope.profiles.push(result);
    });
  };
});
