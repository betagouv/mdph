'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ConditionAidantCtrl
 * @description
 * # ConditionAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ConditionAidantCtrl', function($scope, $state) {

    $scope.title = 'L\'aidant familial';

    $scope.question = {
      'answers': [
        {
          'label': 'Vous êtes accompagné d\'un aidant familial et souhaitez informer la MDPH de ses attentes et besoins',
          'value': true
        },
        {
          'label': 'Vous n\'êtes pas accompagné d\'un aidant familial',
          'value': false
        }
      ],
      radioModel: ($scope.sectionModel.aidant) ? $scope.sectionModel.aidant.value : '',
      setAnswer: function(answer) {
        $scope.sectionModel.aidant = answer;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.aidant);
    };

    $scope.nextStep = function() {
      $state.go('form.vie_quotidienne.vie_famille');
      $scope.broadcastFormTemplate();
    };
  });