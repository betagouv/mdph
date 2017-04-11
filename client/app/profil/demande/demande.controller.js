'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function($scope, $location, $anchorScroll, $state, $filter, $modal, toastr, RequestService, currentUser, request) {
    $scope.request = request;
    $scope.currentUser = currentUser;

    $scope.isEditable = function() {
      return (request.status === 'en_cours' || request.status === 'en_attente_usager');
    };

    function getSelectedPrestationIdList(filter) {
      return _.chain($scope.prestations)
       .filter(filter)
       .pluck('id')
       .value();
    }

    const openErrorModal = ({message, focusFunction, label = 'Retourner au profil'}) => {
      $modal.open({
        templateUrl: 'components/generic-modal/generic-modal.html',
        controllerAs: 'ctrl',
        size: 'md',
        controller($modalInstance) {
          this.title = 'Erreur lors de la tentative d\'envoi de la demande';
          this.body = message;
          this.successLabel = label;

          this.success = function() {
            $modalInstance.close();
            focusFunction();
          };
        }
      });
    };

    const openConfirmModal = () => {
      $modal.open({
        templateUrl: 'components/generic-modal/generic-modal.html',
        controllerAs: 'ctrl',
        size: 'md',
        controller($modalInstance) {
          this.title = 'Confirmation d\'envoi de votre demande';
          this.body = 'Votre demande a bien été transmise !';
          this.successLabel = 'Retourner au profil';

          this.success = function() {
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
          openErrorModal({
            label: 'Accéder à la section des documents obligatoires',
            message: 'Vous n\'avez pas fourni l\'ensemble des documents obligatoires pour la complétude de votre demande.',
            focusFunction: () => {
              $location.hash('section-documents');
              $anchorScroll();
            }
          });
        } else if (currentUser.unconfirmed) {
          openErrorModal({
            label: 'Accéder à votre compte',
            message: `<p>Vous n'avez pas encore confirmé votre compte <em>${currentUser.email}</em>.</p>
            <p>Nous vous avons envoyé un mail contenant un lien à suivre pour finaliser l'ouverture de votre compte. Si vous ne retrouvez pas cet email, vous pouvez accéder à <a href="/mdph/${$scope.request.mdph}/mon_compte">votre compte</a> pour envoyer un nouveau email de confirmation.</p>`,
            focusFunction: () => {
              $state.go('mon_compte');
            }
          });
        } else if (request.prestations.length < 1 && request.renouvellements.length < 1) {
          openErrorModal({
            label: 'Accéder à la section de sélection des prestations',
            message: `Vous devez sélectionner au moins une prestation.`,
            focusFunction: () => {
              $location.hash('section-prestations');
              $anchorScroll();
            }
          });
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

    $scope.openMedicModal = () => {
      $modal.open({
        templateUrl: 'app/profil/demande/medic-modal.html',
        controllerAs: 'medicModalCtrl',
        size: 'md',
        controller($modalInstance) {
          this.emailMedic = '';

          this.ok = function(form) {
            if (form.$invalid) {
              form.showError = true;
            } else {
              RequestService.generateMedicMail(request, this.emailMedic);
              $modalInstance.close();
            }
          };

          this.cancel = function() {
            $modalInstance.close();
          };
        }
      });
    };

    this.prestations = [];

    // This is to make prestations available to getSelectedPrestationIdList & $scope.submit
    $scope.prestations = this.prestations;

    this.cartestationnement = {
      id: 'cartestationnement'
    };
    this.prestations.push(this.cartestationnement);

    this.carteinvalidite = {
      id: 'carteinvalidite'
    };
    this.prestations.push(this.carteinvalidite);

    this.aeeh = {
      id: 'aeeh'
    };
    this.prestations.push(this.aeeh);

    this.aah = {
      id: 'aah'
    };
    this.prestations.push(this.aah);

    this.complement = {
      id: 'complement'
    };
    this.prestations.push(this.complement);

    this.pch = {
      id: 'pch'
    };
    this.prestations.push(this.pch);

    this.rqth = {
      id: 'rqth'
    };
    this.prestations.push(this.rqth);

    this.av = {
      id: 'av'
    };
    this.prestations.push(this.av);

    $scope.ems = {
      id: 'ems'
    };
    this.prestations.push(this.ems);

    this.pps = {
      id: 'pps'
    };
    this.prestations.push(this.pps);

    this.orp = {
      id: 'orp'
    };
    this.prestations.push(this.orp);

    this.formation = {
      id: 'formation'
    };
    this.prestations.push(this.formation);

    this.sms = {
      id: 'sms'
    };
    this.prestations.push(this.sms);

    this.sms_enfant = {
      id: 'sms_enfant'
    };
    this.prestations.push(this.sms_enfant);

    this.ac = {
      id: 'ac'
    };
    this.prestations.push(this.ac);

    this.acfp = {
      id: 'acfp'
    };
    this.prestations.push(this.acfp);

  });
