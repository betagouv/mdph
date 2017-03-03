'use strict';

angular.module('impactApp').controller('MesProfilsCtrl', function($state, $modal, ProfileResource) {
  this.profiles = ProfileResource.query({userId: this.user._id});

  this.addProfile = function() {
    var newProfile = new ProfileResource();
    newProfile.$save({userId: this.user._id}, function(result) {
      $state.go('profil', {profileId: result._id});
      this.profiles.push(result);
    });
  };
})
.controller('ModalDeleteProfileCtrl', function($scope, $modalInstance, profile, requests) {
  $scope.profile = profile;
  $scope.requests = requests;

  $scope.cancel = function() {
    $modalInstance.close(false);
  };

  $scope.ok = function() {
    $modalInstance.close(true);
  };
});
