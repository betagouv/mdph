'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:IndemniteJournaliereCtrl
 * @description
 * # IndemniteJournaliereCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('IndemniteJournaliereCtrl', function($scope, $state) {

    var initialDetail = ($scope.subSectionModel.indemniteJournaliere) ? $scope.subSectionModel.indemniteJournaliere.detail : '';
    var initialRadioModel = ($scope.subSectionModel.indemniteJournaliere) ? $scope.subSectionModel.indemniteJournaliere.value : '';

    $scope.subtitle = $scope.estRepresentant() ?
      'Touche-t-il des indemnités journalières ?' : 'Touchez vous des indemnités journalières ?';

    $scope.question = {
      'answers': [
        {
          'label': 'Non',
          'value': false
        },
        {
          'label': 'Oui',
          'value': true,
          showDetail: true,
          detail: initialDetail,
          detailLabel: 'Depuis quand ?'
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.subSectionModel.indemniteJournaliere = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.subSectionModel.indemniteJournaliere;
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

    if (angular.isDefined($scope.subSectionModel.indemniteJournaliere)) {
      $scope.question.setAnswer($scope.subSectionModel.indemniteJournaliere);
    }

    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.accident_de_travail');
      } else {
        $state.go('^.accident_de_travail');
      }
    };
  });
