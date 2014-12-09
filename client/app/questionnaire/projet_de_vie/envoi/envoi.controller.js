'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EnvoiCtrl
 * @description
 * # EnvoiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, $state, $http, $modal, Auth, RecapitulatifService, DroitService, FormService, RequestService, prestations) {

    $scope.justificatifStr = FormService.estRepresentant($scope.formAnswers) ?
      'de votre justificatif d\'identité ainsi que celui de la personne handicapée' :
      'de votre justificatif d\'identité';

    $scope.prestations = DroitService.compute($scope.formAnswers, prestations);
    $scope.showAdult = FormService.isAdult($scope.formAnswers);
    $scope.answersToHtml = RecapitulatifService.answersToHtml();

    $scope.envoiDemande = function() {
      $http.post('api/send-mail', {mdph: $scope.currentMdph, html: RecapitulatifService.answersToHtml()}).success(function() {
        $modal.open({
          templateUrl: 'app/questionnaire/projet_de_vie/envoi/envoiModal.html',
          controller: function($scope, $modalInstance) {
            $scope.ok = function() {
              $modalInstance.close();
            };
          }
        });
      });
    };

    $scope.saveForm = function() {
      if (Auth.isLoggedIn()) {
        RequestService.getCurrent(function(request) {
          RequestService.saveCurrentForm(request, $scope.currentMdph);
        });
      } else {
        $state.go('departement.questionnaire.projet_de_vie.envoi.modal.login');
      }
    };

  });
