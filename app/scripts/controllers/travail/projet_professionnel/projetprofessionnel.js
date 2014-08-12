'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ProjetProfessionnelCtrl
 * @description
 * # ProjetProfessionnelCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ProjetProfessionnelCtrl', function($scope) {

    if (angular.isUndefined($scope.sectionModel.projetProfessionnel)) {
      $scope.sectionModel.projetProfessionnel = {
        label: 'Projet professionnel',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.projetProfessionnel.answers;
  });
