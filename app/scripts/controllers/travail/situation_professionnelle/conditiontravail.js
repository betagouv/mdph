'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ConditionTravailCtrl
 * @description
 * # ConditionTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ConditionTravailCtrl', function($scope, $state) {

    $scope.question = {
      'answers': [
        {
          'label': 'Vous avez un emploi',
          'labelRep': 'Il a un emploi',
          'value': true},
        {
          'label': 'Vous êtes actuellement sans emploi',
          'labelRep': 'Il est actuellement sans emploi',
          'value': false
        }
      ],
      radioModel: ($scope.subSectionModel.travail) ? $scope.subSectionModel.travail.value : '',
      setAnswer: function(answer) {
        $scope.subSectionModel.travail = answer;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.subSectionModel.travail);
    };

    $scope.nextStep = function() {
      if ($scope.subSectionModel.travail.value) {
        $state.go('^.milieu');
      } else {
        $state.go('^.sans_emploi.passe');
      }
    };
  });
  