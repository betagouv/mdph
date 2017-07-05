'use strict';

angular.module('impactApp').controller('ProfilCtrl', function(
  $state, $modal, $http, toastr, $anchorScroll, $cookies,
  User, RequestResource,
  ProfileService, RequestService,
  currentUser, profile, currentRequest, hasRequest, currentMdph) {

  this.profile = profile;
  this.currentRequest = currentRequest;
  this.currentUser = currentUser;
  this.hasRequest = hasRequest;
  this.RequestResource = RequestResource;
  this.ProfileService = ProfileService;
  this.$state = $state;
  this.$modal = $modal;
  this.token = $cookies.get('token');
  this.$anchorScroll = $anchorScroll;
  this.prestationsCompletion = this.currentRequest.prestations.length > 0 ? 'complete' : null;
  this.documentCompletion = RequestService.getCompletion(currentRequest) ? 'complete' : 'error';
  this.estAdulte = ProfileService.estAdulte(profile);
  this.pdfName = (currentRequest.formAnswers.identites.beneficiaire.nom).toLowerCase() +
    '_' + (currentRequest.formAnswers.identites.beneficiaire.prenom).toLowerCase() +
    '_' + currentRequest.shortId + '.pdf';

  this.sendRequest = () => {
    const missingSections = ProfileService.getMissingSection(profile, currentRequest, currentUser);

    if (missingSections) {
      $anchorScroll(missingSections[0]);
      toastr.error('Vous n\'avez pas fini de remplir les parties obligatoires de ce profil.', 'Erreur de la création de la demande');
      missingSections.forEach((sectionId) => {
        this.options[sectionId].error = true;
      });

      return;
    }

    return RequestService
      .postAction(currentRequest, {
        id: 'submit',
        mdph: currentMdph.zipcode,
      })
      .then(() => {
        $state.go('profil', {}, {reload: true});
      });
  };

  this.options = {
    beneficiaire: {
      title: 'Bénéficiaire',
      icon: 'fa-user',
      model: 'identites.beneficiaire',
      mandatory: true,
      action: {
        sref: 'profil.beneficiaire'
      }
    },

    autorite: {
      title: 'Autorité parentale',
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

    documents: {
      title: 'Documents',
      model: 'documents',
      icon: 'fa-file',
      mandatory: true,
      action: {
        sref: 'profil.documents'
      }
    },

    prestations: {
      title: 'Expression des demandes de droits et prestations',
      model: 'prestations',
      icon: 'fa-list',
      action: {
        sref: 'profil.prestations'
      }
    },

    vieScolaire: {
      title: 'Vie scolaire',
      model: 'vie_scolaire',
      icon: 'fa-university',
      action: {
        sref: 'profil.vie_scolaire'
      }
    },

    vieTravail: {
      title: 'Vie au travail',
      model: 'vie_au_travail',
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
      model: 'situations_particulieres',
      icon: 'fa-warning',
      action: {
        sref: 'profil.situations_particulieres'
      }
    },

    unconfirmed: {
      title: 'Confirmer votre compte mail',
      model: 'mail',
      icon: 'fa-envelope',
      mandatory: true,
      action: {
        sref: 'profil.unconfirmed'
      }
    },
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

});
