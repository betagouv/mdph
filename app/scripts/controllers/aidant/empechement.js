'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmpechementCtrl
 * @description
 * # EmpechementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmpechementCtrl', function($scope, $state) {

    $scope.subtitle = 'En cas d\'empêchement, avez-vous prévu une solution pour vous remplacer ?';

    var initialDetail = ($scope.sectionModel.empechement) ? $scope.sectionModel.empechement.detail : '';
    var initialRadioModel = ($scope.sectionModel.empechement) ? $scope.sectionModel.empechement.value : '';

    $scope.question = {
      answers: [
        {
          label: 'Non',
          value: false
        },
        {
          label: 'Oui',
          value: true,
          showDetail: true,
          detail: initialDetail,
          placeholder: 'Laquelle'
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.sectionModel.empechement = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.empechement;
      if (angular.isUndefined(model)) {
        return true;
      }

      if (model.showDetail && model.detail === '') {
        return true;
      }

      return false;
    };

    $scope.showDetail = function(value) {
      if (value.showDetail && !$state.includes('**.autre')) {
        $state.go('.autre');
      }
    };

    if (angular.isDefined($scope.sectionModel.empechement)) {
      $scope.question.setAnswer($scope.sectionModel.empechement);
    }

    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.situation_future');
      } else {
        $state.go('^.situation_future');
      }
    };
  });
