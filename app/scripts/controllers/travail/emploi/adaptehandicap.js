'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AdapteHandicapCtrl
 * @description
 * # AdapteHandicapCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AdapteHandicapCtrl', function($scope, $state) {

    var initialDetail = ($scope.subSectionModel.adapte) ? $scope.subSectionModel.adapte.detail : '';
    var initialRadioModel = ($scope.subSectionModel.adapte) ? $scope.subSectionModel.adapte.value : '';

    $scope.question = {
      answers: [
        {
          label: 'Votre emploi est adapté à votre handicap',
          labelRep: 'Son emploi est adapté à son handicap',
          value: true
        },
        {
          label: 'Votre emploi n\'est pas adapté à votre handicap',
          labelRep: 'Son emploi n\'est pas adapté à son handicap',
          value: false,
          showDetail: true,
          detail: initialDetail
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.subSectionModel.adapte = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.subSectionModel.adapte;
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

    if (angular.isDefined($scope.subSectionModel.adapte)) {
      $scope.question.setAnswer($scope.subSectionModel.adapte);
    }
    
    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.difficultes');
      } else {
        $state.go('^.difficultes');
      }
    };
  });
