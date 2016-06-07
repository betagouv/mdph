'use strict';

angular.module('impactApp').controller('MesProfilsCtrl', function($scope, $state, $modal, ProfileResource, toastr, currentUser) {
  $scope.profiles = ProfileResource.query({userId: currentUser._id});
  $scope.currentUser = currentUser;

  $scope.addProfile = function() {
    var newProfile = new ProfileResource();
    newProfile.$save({userId: currentUser._id}, function(result) {
      $state.go('profil', {profileId: result._id});
      $scope.profiles.push(result);
    });
  };

  $scope.delete = function(profile, idx) {
    var modalInstance = $modal.open({
      templateUrl: 'app/mon_compte/mes_profils/delete_confirmation.html',
      controller: 'ModalDeleteProfileCtrl',
      resolve: {
        profile: function() {
          return profile;
        },

        currentUser: function() {
          return $scope.currentUser;
        },

        requests: function($http) {
          return $http.get('/api/users/' + currentUser._id + '/profiles/' + profile._id + '/requests').then(function(result) {
            return _.filter(result.data, function(request) {
              return request.status !== 'en_cours';
            });
          });
        }
      }
    });

    modalInstance.result.then(function(result) {
      if (result) {
        profile.$delete({userId: currentUser._id}, function() {
          toastr.success('Le profil "' + profile.getTitle() + '" a bien été suprrimé.', 'Succès');
          $scope.profiles.splice(idx, 1);
        },

        function() {
          toastr.error('Impossible de supprimer le profil "' + profile.getTitle() + '"', 'Erreur');
        });
      }
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
