'use strict';

angular.module('impactApp').controller('ProfilCtrl', function($state, $modal, $http, User, ProfileService, RequestResource, currentUser, profile, currentRequest, hasRequest, toastr, $anchorScroll) {
  this.profile = profile;
  this.estAdulte = ProfileService.estAdulte(profile);
  this.currentRequest = currentRequest;
  this.currentUser = currentUser;
  this.hasRequest = hasRequest;


  this.nouvelleDemande = () => {
    hasSubmitted = false;
    var missingSections = ProfileService.getMissingSection(profile);
    if (missingSections.length > 0) {
      var oldOffSet = $anchorScroll.yOffset;
      $anchorScroll.yOffset = 20;
      $anchorScroll(missingSections[0]);
      $anchorScroll.yOffset = oldOffSet;
      toastr.error('Vous n\'avez pas fini de remplir les parties obligatoires de ce profil.', 'Erreur de la création de la demande');
      missingSections.forEach((sectionId) => {
        this.options[sectionId].error = true;
      });
    } else {

      let askedDocumentTypes = [];
      if (ProfileService.needUploadCV(profile)) {
        askedDocumentTypes.push('cv');
      }

      new RequestResource({profile: profile._id, user: currentUser._id, askedDocumentTypes: askedDocumentTypes}).$save(function(saved) {
        $state.go('.demande', {shortId: saved.shortId});
      });
    }
  };

  this.options = {
    beneficiaire: {
      title: 'Bénéficiaire',
      content: 'Identité de la personne concernée par la demande.',
      icon: 'fa-user',
      model: 'identites.beneficiaire',
      mandatory: true,
      action: {
        sref: 'profil.beneficiaire'
      }
    },

    autorite: {
      title: 'Autorité parentale',
      content: 'Autorité parentale ou délégation d\'autorité.',
      icon: 'fa-users',
      model: 'identites.autorite',
      mandatory: !this.estAdulte,
      action: {
        sref: 'profil.autorite'
      }
    },

    autre: {
      title: 'Personne vous aidant dans cette démarche',
      model: 'identites.autre',
      icon: 'fa-users',
      action: {
        sref: 'profil.autre'
      }
    },

    vieQuotidienne: {
      title: 'Vie quotidienne',
      model: 'vie_quotidienne',
      icon: 'fa-home',
      mandatory: true,
      action: {
        sref: 'profil.vie_quotidienne'
      }
    },

    vieScolaire: {
      title: 'Vie scolaire',
      model: 'vie_scolaire',
      content: 'Concerne les personnes en cours de scolarisation ou désirant reprendre un cursus scolaire',
      icon: 'fa-university',
      action: {
        sref: 'profil.vie_scolaire'
      }
    },

    vieTravail: {
      title: 'Vie au travail',
      model: 'vie_au_travail',
      content: 'Concerne les personnes en âge de travailler',
      icon: 'fa-industry',
      action: {
        sref: 'profil.vie_au_travail'
      }
    },

    aidant: {
      title: 'Vie de votre aidant familial',
      icon: 'fa-male',
      model: 'aidant',
      action: {
        sref: 'profil.aidant.situation.nom_aidant'
      }
    },
    particulieres: {
      title: 'Situations particulières',
      content: 'Concerne les situations nécessitant une attention particulière.',
      model: 'situations_particulieres',
      icon: 'fa-warning',
      action: {
        sref: 'profil.situations_particulieres'
      }
    }
  };

  this.delete = () => {
    var modalInstance = $modal.open({
      templateUrl: 'components/mes_profils/delete_confirmation.html',
      controller: 'ModalDeleteProfileCtrl',
      resolve: {
        profile: () => {
          return this.profile;
        },

        requests: ($http) => {
          return $http.get('/api/users/' + this.currentUser._id + '/profiles/' + this.profile._id + '/requests').then(function(result) {
            return _.filter(result.data, function(request) {
              return request.status !== 'en_cours';
            });
          });
        }
      }
    });

    modalInstance.result.then((result) => {
      if (result) {
        profile.$delete({userId: this.currentUser._id}, function success() {
          toastr.success('Le profil "' + profile.getTitle() + '" a bien été supprimé.', 'Succès');
          $state.go('departement');
        },

        function error() {
          toastr.error('Impossible de supprimer le profil "' + profile.getTitle() + '"', 'Erreur');
        });
      }
    });
  };

  this.openRequestHistory = function() {
    $modal.open({
      templateUrl: 'app/profil/history.modal.html',
      controllerAs: 'modalHistory',
      size: 'lg',
      resolve: {
        requests: function($http) {
          return $http.get(`/api/users/${currentUser._id}/profiles/${profile._id}/requests`).then(function(result) {
            return result.data;
          });
        }
      },
      controller($modalInstance, $state, requests) {
        this.requests = requests;

        this.ok = function() {
          $modalInstance.close();
        };
      }
    });
  };
});
