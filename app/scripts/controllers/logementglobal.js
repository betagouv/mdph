'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:LogementGlobalCtrl
 * @description
 * # LogementGlobalCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('LogementGlobalCtrl', function($scope, $state) {

    $scope.question = {
      'title' : 'Votre vie quotidienne',
      'subTitle' : 'Vous vivez',
      'detail' : '',
      'answers' : [
        {'label' : 'Avec vos parents', 'value' : 'parents'},
        {'label' : 'Seul', 'value' : 'seul'},
        {'label' : 'En couple', 'value' : 'couple'},
        {'label' : 'Avec vos enfants', 'value' : 'enfants'},
        {'label' : 'Autre', 'value' : 'autre', 'detail' : true }
      ]
    };

    $scope.$watch('question.model', function() {
      $state.go('q.vie_quotidienne.logement_global.precisez');
    });

    $scope.isNextStepDisabled = function() {
      if ($scope.question.model === undefined) {
        return true;
      }
      if ($scope.question.model === 'autre' && $scope.question.detail === '') {
        return true;
      }
      return false;
    };

    $scope.nextStep = function() {
      $scope.data.vie = $scope.question.model;
      $scope.data.vieDetail = $scope.question.detail;
      $state.go('q.vie_quotidienne.logement_detail');
    };
  });
