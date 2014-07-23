'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DescriptionProjetProCtrl
 * @description
 * # DescriptionProjetProCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DescriptionProjetProCtrl', function($scope, $state) {

    var initialDetail = ($scope.subSectionModel.description) ? $scope.subSectionModel.description.detail : '';
    var initialRadioModel = ($scope.subSectionModel.description) ? $scope.subSectionModel.description.value : '';

    $scope.question = {
      answers: [
        {
          label: 'Vous avez un ou plusieurs projet(s) professionnel(s)',
          labelRep: 'Il a un ou plusieurs projet(s) professionnel(s)',
          value: true,
          showDetail: true,
          detail: initialDetail
        },
        {
          label: 'Vous n\'avez pas de projet professionnel',
          labelRep: 'Il n\'a pas de projet professionnel',
          value: false
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.subSectionModel.description = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.subSectionModel.description;
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

    if (angular.isDefined($scope.subSectionModel.description)) {
      $scope.question.setAnswer($scope.subSectionModel.description);
    }
    
    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.besoin_soutien');
      } else {
        $state.go('^.besoin_soutien');
      }
    };
  });
