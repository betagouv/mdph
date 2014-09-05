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

    $scope.subtitle = 'Vivez-vous avec la personne en situation de handicap ?';

    if (angular.isUndefined($scope.sectionModel.vie)) {
      $scope.sectionModel.vie = {};
    }

    $scope.question = {
      model: 'vie',
      answers: [
        {
          label: 'Non',
          value: false
        },
        {
          label: 'Oui',
          value: true,
          detailUrl: 'components/detail/precisez_date.html',
          detail: $scope.sectionModel.vie.detail,
          detailLabel: 'Depuis quand ?'
        }
      ]
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.vie;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.emploi');
    };
  });
