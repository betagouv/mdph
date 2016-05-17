'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function($scope, $state, $filter, $modal, toastr, RequestService, currentUser, request, prestations) {
    $scope.request = request;
    $scope.currentUser = currentUser;

    $scope.isEditable = function() {
      return (request.status === 'en_cours' || request.status === 'en_attente_usager');
    };

    function getSelectedPrestationIdList(filter) {
      return _.chain(prestations)
       .filter(filter)
       .pluck('id')
       .value();
    }

    let openConfirmModal = () => {
      $modal.open({
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/modal.html',
        controllerAs: 'requestModalCtrl',
        size: 'md',
        controller($modalInstance) {
          this.ok = function() {
            $modalInstance.close();
          };
        }
      });
    };

    $scope.submit = function(form) {
      if (!form.$valid) {
        toastr.error('Vous n\'avez pas spécifié de MDPH destinataire de votre demande.', 'Erreur lors de la tentative d\'envoi');
      } else {
        if (request.status === 'en_cours') {
          request.renouvellements = getSelectedPrestationIdList({choice: true, renouvellement: true});
          request.prestations = getSelectedPrestationIdList(function(current) {
            return current.choice && !current.renouvellement;
          });
        }

        if (!RequestService.getCompletion(request)) {
          toastr.error('Vous n\'avez pas fourni l\'ensemble des documents obligatoires pour la complétude de votre demande.', 'Erreur lors de la tentative d\'envoi');
        } else if (currentUser.unconfirmed) {
          toastr.error('Vous n\'avez pas confirmé votre compte ' + currentUser.email, 'Erreur lors de la tentative d\'envoi');
        } else if (request.prestations.length < 1 && request.renouvellements.length < 1) {
          toastr.error('Vous n\'avez pas demandé de prestation', 'Erreur lors de la tentative d\'envoi');
        } else {
          return RequestService.postAction(request, {
            id: 'submit',
            prestations: request.prestations,
            renouvellements: request.renouvellements,
            mdph: request.mdph,
            renouvellement: request.estRenouvellement,
            old_mdph: request.old_mdph,
            numeroDossier: request.numeroDossier
          }).then(() => {
            $state.go('^', {}, {reload: true});
            openConfirmModal();
          });
        }
      }
    };
  });
