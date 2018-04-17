'use strict';

angular.module('impactApp')
  .controller('GestionProfilCtrl', function($http, $state, $modal,toastr, currentMdph, currentUser, profils, ProfileResource) {
    this.currentMdph = currentMdph;
    this.currentUser = currentUser;

    this.profils = _.filter(profils, function(profil) {
      return !profil.hasOwnProperty('deletedAt');
    });

    this.deletedProfils = _.filter(profils, function(profil) {
      return profil.hasOwnProperty('deletedAt');
    });

    this.createProfil = function() {
      new ProfileResource().$save({userId: this.currentUser._id}, function(profilResult) {
        $http.post(`/api/users/${currentUser._id}/profiles/${profilResult._id}/requests/new`).then(function(demandeResult) {
          $state.go('demande', {shortId: demandeResult.data.shortId});
        });
      });
    };

    this.deleteProfil = function(profil) {
      this.profile = profil;
      var modalInstance = $modal.open({
        templateUrl: 'app/gestion/profil/delete_confirmation.html',
        controller: 'ModalDeleteProfileCtrl',
        resolve: {
          profile: () => {
            return this.profile;
          },

          requests: ($http) => {
            return $http.get('/api/users/' + this.currentUser._id + '/profiles/' + profil._id + '/requests').then(function(result) {
              return _.filter(result.data, function(request) {
                return request.status !== 'en_cours';
              });
            });
          }
        }
      });

      modalInstance.result.then((result) => {
        if (result) {
          $http.delete('/api/users/' + this.currentUser._id + '/profiles/' + profil._id).then(function() {
            toastr.success('Le profil "' + profil.getTitle() + '" a bien été supprimé.', 'Succès');
            $state.go($state.current, {}, {reload: true});
          }).catch(function() {
            toastr.error('Impossible de supprimer le profil "' + profil.getTitle() + '"', 'Erreur');
          });
        }
      });
    };

    this.goProfil = function(profil) {
      $state.go('gestion_demande', {profilId: profil._id});
    };

    this.showCurrentRequestStatus = function(profile) {
      switch (profile.currentRequestStatus) {
        case 'en_cours':
          return 'en cours de création';
        case 'emise':
          return 'émise';
        case 'validee':
          return 'validée';
        case 'en_attente_usager':
          return 'en attente';
        case 'irrecevable':
          return 'Irrecevable';
        default:
          return 'indéfinie';
      }
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
