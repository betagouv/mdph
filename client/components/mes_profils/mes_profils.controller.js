'use strict';

angular.module('impactApp').controller('MesProfilsCtrl', function($state, $modal, ProfileResource, toastr) {
  this.profiles = ProfileResource.query({userId: this.user._id});

  this.addProfile = function() {
    var newProfile = new ProfileResource();
    newProfile.$save({userId: this.user._id}, function(result) {
      $state.go('profil', {profileId: result._id});
      this.profiles.push(result);
    });
  };

  this.delete = function(profile, user, idx) {
    var modalInstance = $modal.open({
      templateUrl: 'components/mes_profils/delete_confirmation.html',
      controller: 'ModalDeleteProfileCtrl',
      resolve: {
        profile: function() {
          return profile;
        },

        requests: function($http) {
          return $http.get('/api/users/' + user._id + '/profiles/' + profile._id + '/requests').then(function(result) {
            return _.filter(result.data, function(request) {
              return request.status !== 'en_cours';
            });
          });
        }
      }
    });

    modalInstance.result.then((result) => {
      if (result) {
        profile.$delete({userId: this.user._id}, () => {
          toastr.success('Le profil "' + profile.getTitle() + '" a bien été supprimé.', 'Succès');
          this.profiles.splice(idx, 1);
        },

        () => {
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
