'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VieAidantCtrl
 * @description
 * # VieAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VieAidantCtrl', function($scope, $state) {

    $scope.subtitle = 'Relation';

    var initialDetail = ($scope.sectionModel.vie) ? $scope.sectionModel.vie.detail : '';
    var initialRadioModel = ($scope.sectionModel.vie) ? $scope.sectionModel.vie.value : '';

    $scope.question = {
      answers: [
        {
          label: 'Vous ne vivez pas avec la personne en situation de handicap',
          value: false
        },
        {
          label: 'Vous vivez avec la personne en situation de handicap',
          value: true,
          showDetail: true,
          detail: initialDetail,
          detailLabel: 'Depuis quand ?'
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.sectionModel.vie = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      startingDay: 1
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.vie;
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

    if (angular.isDefined($scope.sectionModel.vie)) {
      $scope.question.setAnswer($scope.sectionModel.vie);
    }
    
    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.emploi');
      } else {
        $state.go('^.emploi');
      }
    };
  });
