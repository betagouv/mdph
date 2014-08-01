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

    if (angular.isUndefined($scope.$storage.travail.answers.projetProfessionnel)) {
      $scope.$storage.travail.answers.projetProfessionnel = {
        label: 'Projet professionnel',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.travail.answers.projetProfessionnel.answers;
  });
