'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function($scope, $state, $filter, toastr, RequestService, currentUser, request, prestations) {
    $scope.request = request;
    $scope.currentUser = currentUser;

    $scope.isEditable = function() {
      return (request.status === 'en_cours' || request.status === 'en_attente_usager');
    };

    function getSelectedPrestationIdList(choice) {
      return _.chain(prestations)
       .filter({choice})
       .pluck('id')
       .value();
    }

    $scope.submit = function(form) {
      if (!form.$valid) {
        toastr.error('Vous n\'avez pas spécifié de MDPH destinataire de votre demande.', 'Erreur lors de la tentative d\'envoi');
      } else {
        if (request.status === 'en_cours') {
          request.prestations = getSelectedPrestationIdList('true');
          request.renouvellements = getSelectedPrestationIdList('renouvellement');
        }

        if (!RequestService.getCompletion(request)) {
          toastr.error('Vous n\'avez pas fourni l\'ensemble des documents obligatoires pour la complétude de votre demande.', 'Erreur lors de la tentative d\'envoi');
        } else if (currentUser.unconfirmed) {
          toastr.error('Vous n\'avez pas confirmé votre compte ' + currentUser.email, 'Erreur lors de la tentative d\'envoi');
        } else if (request.prestations.length < 1 && request.renouvellements.length < 1) {
          toastr.error('Vous n\'avez pas demandé de prestation', 'Erreur lors de la tentative d\'envoi');
        } else {
          request.status = 'emise';
          request.submittedAt = Date.now();
          request.$update({isSendingRequest: true}, function() {
            $state.go('^', {}, {reload: true});
          });
        }
      }
    };
  });
