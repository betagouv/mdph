'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function($scope, $location, $anchorScroll, $state, $filter, $modal, toastr, RequestService, currentUser, request, prestations, ProfileService, profile) {
    $scope.request = request;
    $scope.currentUser = currentUser;
    this.estAdulte = ProfileService.estAdulte(profile);
    this.pps_comment = '';

    $scope.isEditable = function() {
      return (request.status === 'en_cours' || request.status === 'en_attente_usager');
    };

    const getSelectedPrestationIdList = (filter, prestations) => {
      return _.chain(prestations)
       .filter(filter)
       .pluck('id')
       .value();
    };

    const getPpsComment = (request, renouvellements = [], pps_comment = '') => {
      if (renouvellements.includes('pps') && pps_comment) {
        request.pps_comment = pps_comment;
      }

      return request;
    };

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

    $scope.submit = form => {
      if (!form.$valid) {
        toastr.error('Vous n\'avez pas spécifié de MDPH destinataire de votre demande.', 'Erreur lors de la tentative d\'envoi');
      } else {
        if (request.status === 'en_cours') {
          request.renouvellements = getSelectedPrestationIdList({choice: true, renouvellement: true}, this.prestations);
          request.prestations = getSelectedPrestationIdList(function(current) {
            return current.choice && !current.renouvellement;
          }, this.prestations);
          request = getPpsComment(request, request.renouvellements, this.pps_comment);
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

    this.cartestationnement = prestations.cartestationnement;
    this.prestations.push(this.cartestationnement);

    this.carteinvalidite = prestations.carteinvalidite;
    this.prestations.push(this.carteinvalidite);

    this.aeeh = prestations.aeeh;
    this.prestations.push(this.aeeh);

    this.aah = prestations.aah;
    this.prestations.push(this.aah);

    this.complement = prestations.complement;
    this.prestations.push(this.complement);

    this.pch = prestations.pch;
    this.prestations.push(this.pch);

    this.rqth = prestations.rqth;
    this.prestations.push(this.rqth);

    this.crp_cpo_ueros = prestations.crp_cpo_ueros;
    this.prestations.push(this.crp_cpo_ueros);

    this.esat = prestations.esat;
    this.prestations.push(this.esat);

    this.marche_travail = prestations.marche_travail;
    this.prestations.push(this.marche_travail);

    this.marche_travail_acc = prestations.marche_travail_acc;
    this.prestations.push(this.marche_travail_acc);

    this.av = prestations.av;
    this.prestations.push(this.av);

    this.ems = prestations.ems;
    this.prestations.push(this.ems);

    this.pps = prestations.pps;
    this.prestations.push(this.pps);

    this.orp = prestations.orp;
    this.prestations.push(this.orp);

    this.formation = prestations.formation;
    this.prestations.push(this.formation);

    this.sms = prestations.sms;
    this.prestations.push(this.sms);

    this.sms_enfant = prestations.sms_enfant;
    this.prestations.push(this.sms_enfant);

    this.ac = prestations.ac;
    this.prestations.push(this.ac);

    this.acfp = prestations.acfp;
    this.prestations.push(this.acfp);

  });
