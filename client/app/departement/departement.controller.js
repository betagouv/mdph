'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function ($scope, $state, Auth, mdph, RequestService, $sessionStorage) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.currentMdph = mdph;

    $scope.start = function() {
      RequestService.resetCurrent();
      $state.go('departement.questionnaire.projet_de_vie.informations.representant', {codeDepartement: $scope.currentMdph.zipcode});
    };

    $scope.listeDemande = function() {
      $state.go('liste_demandes');
    };

    $scope.getMdphName = function() {
      return ' ' + $scope.currentMdph.name;
    };

    $scope.getVerticalOffset = function() {
      return $sessionStorage.hideIntro ? '-925' : '-948';
    };

    $scope.getMdphBgClass = function() {
      return 'bg' + $scope.currentMdph.zipcode;
    };
  });
