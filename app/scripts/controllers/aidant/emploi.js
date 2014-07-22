'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiAidantCtrl
 * @description
 * # EmploiAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiAidantCtrl', function($scope, $state) {

    $scope.subtitle = 'Emploi';

    var initialDetail = ($scope.sectionModel.emploi) ? $scope.sectionModel.emploi.detail : false;
    var initialRadioModel = ($scope.sectionModel.emploi) ? $scope.sectionModel.emploi.value : '';

    $scope.question = {
      answers: [
        {
          label: 'Vous avez un emploi',
          value: true,
          showDetail: true,
          detail: initialDetail,
          detailLabel: 'Réduction d’activité liée à la prise en charge de la personne aidée'
        },
        {
          label: 'Vous êtes actuellement sans emploi',
          value: false
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.sectionModel.emploi = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.emploi;
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

    if (angular.isDefined($scope.sectionModel.emploi)) {
      $scope.question.setAnswer($scope.sectionModel.emploi);
    }
    
    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.nature_aide');
      } else {
        $state.go('^.nature_aide');
      }
    };
  });
