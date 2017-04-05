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

    $scope.prestations = [];

    $scope.cartestationnement = {
      id: 'cartestationnement'
    };
    $scope.prestations.push($scope.cartestationnement);

    $scope.carteinvalidite = {
      id: 'carteinvalidite'
    };
    $scope.prestations.push($scope.carteinvalidite);

    $scope.aeeh = {
      id: 'aeeh'
    };
    $scope.prestations.push($scope.aeeh);

    $scope.aah = {
      id: 'aah'
    };
    $scope.prestations.push($scope.aah);

    $scope.complement = {
      id: 'complement'
    };
    $scope.prestations.push($scope.complement);

    $scope.pch = {
      id: 'pch'
    };
    $scope.prestations.push($scope.pch);

    $scope.rqth = {
      id: 'rqth'
    };
    $scope.prestations.push($scope.rqth);

    $scope.av = {
      id: 'av'
    };
    $scope.prestations.push($scope.av);

    $scope.ems = {
      id: 'ems'
    };
    $scope.prestations.push($scope.ems);

    $scope.pps = {
      id: 'pps'
    };
    $scope.prestations.push($scope.pps);

    $scope.orp = {
      id: 'orp'
    };
    $scope.prestations.push($scope.orp);

    $scope.formation = {
      id: 'formation'
    };
    $scope.prestations.push($scope.formation);

    $scope.sms = {
      id: 'sms'
    };
    $scope.prestations.push($scope.sms);

    $scope.sms_enfant = {
      id: 'sms_enfant'
    };
    $scope.prestations.push($scope.sms_enfant);

    $scope.ac = {
      id: 'ac'
    };
    $scope.prestations.push($scope.ac);

    $scope.acfp = {
      id: 'acfp'
    };
    $scope.prestations.push($scope.acfp);

  });
