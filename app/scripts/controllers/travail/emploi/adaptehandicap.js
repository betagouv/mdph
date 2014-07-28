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

    $scope.subtitle = $scope.estRepresentant() ? 'Son emploi est-il adapté à son handicap ?' : 'Votre emploi est-il adapté à votre handicap ?';

    $scope.question = {
      answers: [
        {
          label: 'Non',
          value: false,
          showDetail: true,
          detail: initialDetail
        },
        {
          label: 'Oui',
          value: true
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
