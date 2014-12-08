'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:RecapitulatifCtrl
 * @description
 * # RecapitulatifCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('RecapitulatifCtrl', function($scope, $sessionStorage, $http, $modal, Auth, RecapitulatifService) {
    $scope.formAnswers = $sessionStorage.formAnswers;
    $scope.answersToHtml = RecapitulatifService.answersToHtml;
  });
