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
          $state.go('demande.beneficiaire', {shortId: demandeResult.data.shortId}, {reload: true});
        });
      });
    };

    this.deleteProfil = function(profil) {
      var deleteProfilModalInstance = $modal.open({
        templateUrl: 'app/gestion/profil/delete_confirmation.html',
        controller: function($scope, $modalInstance, demandes) {
          this.profil = profil;
          this.demandes = demandes;
          this.cancel = function() {
            $modalInstance.close(false);
          };

          this.ok = function() {
            $modalInstance.close(true);
          };
        },

        controllerAs: 'deleteProfilConfirmationCtrl',
        resolve: {
          demandes: ($http) => {
            return $http.get('/api/users/' + this.currentUser._id + '/profiles/' + profil._id + '/requests').then(function(result) {
              return _.filter(result.data, function(request) {
                return request.status !== 'en_cours';
              });
            });
          }
        }
      });

      deleteProfilModalInstance.result.then((result) => {
        if (result) {
          ProfileResource.remove({userId: currentUser._id, id: profil._id}).$promise.then(function() {
            return $state.go('gestion_profil', {}, {reload: true});
          });
        }
      });
    };

    this.goProfil = function(profil) {
      $state.go('gestion_demande', {profilId: profil._id});
    };

    this.showCurrentRequestStatus = function(profile) {
      return this.currentRequestStatus(profile) ? 'Dernière demande ' + this.currentRequestStatus(profile) : '';
    };

    this.showCurrentRequestSendedStatus = function(profile) {
      return this.currentRequestStatus(profile) ? 'Dernière demande envoyée ' + this.currentRequestStatus(profile) : '';
    };

    this.currentRequestStatus = function(profile) {
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
          return 'irrecevable';
        default:
          return '';
      }
    };

  });
