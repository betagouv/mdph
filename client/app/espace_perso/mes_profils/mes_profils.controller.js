'use strict';

angular.module('impactApp').controller('MesProfilsCtrl', function($scope, ProfileResource, currentUser) {
  $scope.profiles = ProfileResource.query({userId: currentUser._id});

  $scope.addProfile = function() {
    var newProfile = new ProfileResource();
    newProfile.$save({userId: currentUser._id});
    $scope.profiles.push(newProfile);
  };

});
