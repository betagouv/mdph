'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ScolaireCtrl
 * @description
 * # ScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ScolaireCtrl', function ($scope, $sessionStorage) {

    $scope.currentSection = $sessionStorage.sectionScolarite;
    $scope.title = $scope.estRepresentant() ? 'Sa scolarité' : 'Votre scolarité';


    if (angular.isUndefined($scope.$storage.scolaire)) {
      $scope.$storage.scolaire = {
        sectionLabel: $scope.title,
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.scolaire.answers;
  });
