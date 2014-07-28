'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AmenagementCtrl
 * @description
 * # AmenagementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AmenagementCtrl', function($scope, $state) {

    var initialDetail = ($scope.subSectionModel.amenagement) ? $scope.subSectionModel.amenagement.detail : '';
    var initialRadioModel = ($scope.subSectionModel.amenagement) ? $scope.subSectionModel.amenagement.value : '';

    $scope.subtitle = $scope.estRepresentant() ?
      'Des aménagements ont-ils été réalisés sur son poste de travail ?' : 'Des aménagements ont-ils été réalisés sur votre poste de travail ?';

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
          detail: initialDetail
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.subSectionModel.amenagement = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.subSectionModel.amenagement;
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

    if (angular.isDefined($scope.subSectionModel.amenagement)) {
      $scope.question.setAnswer($scope.subSectionModel.amenagement);
    }

    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.arret_de_travail');
      } else {
        $state.go('^.arret_de_travail');
      }
    };
  });
