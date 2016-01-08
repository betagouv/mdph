'use strict';

angular.module('impactApp').controller('ProfilCtrl', function($scope, ProfileResource, currentUser, profileId) {
  $scope.profile = ProfileResource.get({userId: currentUser._id, id: profileId});
});
