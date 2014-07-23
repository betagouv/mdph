'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:MedecinTravailCtrl
 * @description
 * # MedecinTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('MedecinTravailCtrl', function($scope, $state) {

    var initialDetail = ($scope.subSectionModel.medecinTravail) ? $scope.subSectionModel.medecinTravail.detail : '';
    var initialRadioModel = ($scope.subSectionModel.medecinTravail) ? $scope.subSectionModel.medecinTravail.value : '';

    $scope.question = {
      answers: [
        {
          label: 'Vous n\'avez pas rencontré le médecin du travail en visite de pré-reprise',
          labelRep: 'Il n\'a pas rencontré le médecin du travail en visite de pré-reprise',
          value: false
        },
        {
          label: 'Vous avez rencontré le médecin du travail en visite de pré-reprise',
          labelRep: 'Il a rencontré le médecin du travail en visite de pré-reprise',
          value: true,
          showDetail: true,
          detail: initialDetail,
          detailLabel: 'A quelle date ?'
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.subSectionModel.medecinTravail = answer;
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
      var model = $scope.subSectionModel.medecinTravail;
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

    if (angular.isDefined($scope.subSectionModel.medecinTravail)) {
      $scope.question.setAnswer($scope.subSectionModel.medecinTravail);
    }
    
    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.^.projet_professionnel.description');
      } else {
        $state.go('^.^.projet_professionnel.description');
      }
    };
  });
