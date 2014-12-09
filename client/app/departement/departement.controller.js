'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function ($scope, $state, Auth, mdph, $sessionStorage) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.currentMdph = mdph;

    $scope.start = function() {
      $state.go('departement.questionnaire.projet_de_vie.informations.representant', {codeDepartement: $scope.currentMdph.zipcode});
    };

    $scope.getMdphName = function() {
      return ' ' + $scope.currentMdph.name;
    };

    $scope.getVerticalOffset = function() {
      return $sessionStorage.hideIntro ? '-925' : '-948';
    };
  });
