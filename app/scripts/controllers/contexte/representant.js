'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:RepresentantCtrl
 * @description
 * # RepresentantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('RepresentantCtrl', function($scope, $state) {
    $scope.title = 'Pour qui faites vous cette demande ?';

    var initialDetail = ($scope.sectionModel.estRepresentant) ? $scope.sectionModel.estRepresentant.detail : '';
    var initialRadioModel = ($scope.sectionModel.estRepresentant) ? $scope.sectionModel.estRepresentant.value : '';

    $scope.question = {
      'answers': [
        {label: 'Pour vous', value: false},
        {
          label: 'Pour un(e) autre',
          value: true,
          detail: initialDetail,
          showDetail: true,
          placeholder: 'Prénom'
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.sectionModel.estRepresentant = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.estRepresentant;
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

    if (angular.isDefined($scope.sectionModel.estRepresentant)) {
      $scope.showDetail($scope.sectionModel.estRepresentant);
    }

    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.dossier');
      } else {
        $state.go('^.dossier');
      }
    };
  });
