'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function ($scope, $state, Auth, mdph, RequestService, $sessionStorage, RequestResource) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.currentRequest = RequestService.getCurrent();

    if (!$scope.currentRequest) {
      $scope.currentRequest = new RequestResource();
      $scope.currentRequest.formAnswers = {};
      RequestService.setCurrent($scope.currentRequest);
    }

    RequestService.setCurrentMdph(mdph);
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
