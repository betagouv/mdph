'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EnvoiCtrl
 * @description
 * # EnvoiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, $state, DroitService, $http, $modal, Auth, FormService, RequestService) {

    if (angular.isUndefined($scope.formAnswers.envoi)) {
      $scope.formAnswers.envoi = true;
    }

    $scope.justificatifStr = FormService.estRepresentant($scope.formAnswers) ?
      'de votre justificatif d\'identité ainsi que celui de la personne handicapée' :
      'de votre justificatif d\'identité';

    $scope.showAdult = $scope.isAdult();
    $scope.prestations = DroitService.compute($scope.formAnswers);

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
