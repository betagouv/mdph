'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EnvoiCtrl
 * @description
 * # EnvoiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, isAdult) {
    $scope.typeEnvoi = 'numerique';
    $scope.justificatifStr = $scope.data.estRepresentant ? 
      'de votre justificatif d\'identité ainsi que celui de la personne handicapée' : 
      'de votre justificatif d\'identité';
    $scope.showAdult = isAdult($scope.data.dateNaissance);
  });
