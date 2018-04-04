'use strict';

angular.module('impactApp')
  .controller('GestionProfilCtrl', function($http, $state, currentMdph, currentUser, profils, ProfileResource) {
    this.currentMdph = currentMdph;
    this.currentUser = currentUser;

    this.profils = _.filter(profils, function(profil) {
      return !profil.hasOwnProperty('deletedAt');
    });

    this.deletedProfils = [];

    // _.filter(profils, function(profil) {
    //   return profil.hasOwnProperty('deletedAt');
    // });

    this.createProfil = function() {
      new ProfileResource().$save({userId: this.currentUser._id}, function(profilResult) {
        $http.get(`/api/users/${currentUser._id}/profiles/${profilResult._id}/requests/current`).then(function(demandeResult) {
          $state.go('demande', {shortId: demandeResult.data.shortId});
        });
      });
    };

    this.deleteProfil = function() {
      // var modalInstance = $modal.open({
      //   templateUrl: 'components/mes_profils/delete_confirmation.html',
      //   controller: 'ModalDeleteProfileCtrl',
      //   resolve: {
      //     profile: () => {
      //       return this.profile;
      //     },

      //     requests: ($http) => {
      //       return $http.get('/api/users/' + this.currentUser._id + '/profiles/' + this.profile._id + '/requests').then(function(result) {
      //         return _.filter(result.data, function(request) {
      //           return request.status !== 'en_cours';
      //         });
      //       });
      //     }
      //   }
      // });

      // modalInstance.result.then((result) => {
      //   if (result) {
      //     profile.$delete({userId: this.currentUser._id}, function success() {
      //       toastr.success('Le profil "' + profile.getTitle() + '" a bien été supprimé.', 'Succès');
      //       $state.go('departement');
      //     },

      //     function error() {
      //       toastr.error('Impossible de supprimer le profil "' + profile.getTitle() + '"', 'Erreur');
      //     });
      //   }
      // });
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
        case 'enregistree':
          return 'enregistrée';
        case 'en_attente_usager':
          return 'en attente';
        case 'archive':
          return 'archivée';
        default:
          return 'indéfinie';
      }
    };

  });

// .controller('ModalDeleteProfileCtrl', function($scope, $modalInstance, profile, requests) {
//   $scope.profile = profile;
//   $scope.requests = requests;

//   $scope.cancel = function() {
//     $modalInstance.close(false);
//   };

//   $scope.ok = function() {
//     $modalInstance.close(true);
//   };
// });
