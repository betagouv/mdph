'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EnvoiCtrl
 * @description
 * # EnvoiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, $state, $http, $modal, Auth, DroitService, FormService, RequestService, prestations) {

    if (angular.isUndefined($scope.formAnswers.envoi)) {
      $scope.formAnswers.envoi = true;
    }

    $scope.justificatifStr = FormService.estRepresentant($scope.formAnswers) ?
      'de votre justificatif d\'identité ainsi que celui de la personne handicapée' :
      'de votre justificatif d\'identité';

    $scope.prestations = DroitService.compute($scope.formAnswers, prestations);
    $scope.showAdult = $scope.isAdult();

    $scope.saveForm = function() {
      if (Auth.isLoggedIn()) {
        RequestService.getCurrent(function(request) {
          RequestService.saveCurrentForm(request);
        });
      } else {
        $state.go('form.envoi.modal.login');
      }
    };
  });
