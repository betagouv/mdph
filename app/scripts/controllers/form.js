'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('FormCtrl', function ($rootScope, $scope, $state, $stateParams, $sessionStorage, isAdult) {

    // TODO remplacer toute cette partie par ui-serf-active quand
    // ca marchera pour les nested states
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $scope.formTemplate = $sessionStorage.formTemplate;
    $scope.data =  $sessionStorage.data;

    $scope.isAdult = function() {
      return isAdult($scope.data.contexte);
    };

    $scope.isActive = function(state) {
      return $state.includes(state.filter);
    };

    $scope.getSRef = function(state) {
      return state.sref;
    };

    $scope.goToNextSection = function(currentSection) {
      for (var i = 0; i < $scope.formTemplate.length; i++) {
        if ($scope.formTemplate[i].section === currentSection) {
          $state.go($scope.formTemplate[i + 1].sref);
        }
      }
    };

    $scope.processForm = function() {
      console.log($scope.data);
    };
  });
