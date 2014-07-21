'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:PoleEmploiCtrl
 * @description
 * # PoleEmploiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('PoleEmploiCtrl', function($scope, $state) {

    var initialDetail = ($scope.subSectionModel.poleEmploi) ? $scope.subSectionModel.poleEmploi.detail : '';
    var initialRadioModel = ($scope.subSectionModel.poleEmploi) ? $scope.subSectionModel.poleEmploi.value : '';

    $scope.question = {
      answers: [
        {
          label: 'Vous n\'êtes pas inscrit à Pôle Emploi',
          labelRep: 'Il n\'est pas inscrit à Pôle Emploi',
          value: false
        },
        {
          label: 'Vous êtes inscrit à Pôle Emploi',
          labelRep: 'Il est inscrit à Pôle Emploi',
          value: true,
          showDetail: true,
          detail: initialDetail,
          detailLabel: 'Depuis quand ?'
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.subSectionModel.poleEmploi = answer;
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
      var model = $scope.subSectionModel.poleEmploi;
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

    if (angular.isDefined($scope.subSectionModel.poleEmploi)) {
      $scope.question.setAnswer($scope.subSectionModel.poleEmploi);
    }
    
    $scope.nextStep = function() {
      $scope.goToNextSection($scope.section);
    };
  });
