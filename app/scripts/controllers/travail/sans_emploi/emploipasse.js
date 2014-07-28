'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiPasseCtrl
 * @description
 * # EmploiPasseCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiPasseCtrl', function($scope, $state) {

    var initialDetail = ($scope.subSectionModel.passe) ? $scope.subSectionModel.passe.detail : '';
    var initialRadioModel = ($scope.subSectionModel.passe) ? $scope.subSectionModel.passe.value : '';

    $scope.subtitle = $scope.estRepresentant() ?
      'A-t-il déjà travaillé ?' : 'Avez-vous déjà travaillé ?';

    $scope.question = {
      answers: [
        {
          label: 'Oui',
          value: true,
          showDetail: true,
          detail: initialDetail,
          placeholder: 'Pourquoi êtes-vous actuellement sans emploi et depuis quand ?'
        },
        {
          label: 'Non',
          value: false
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.subSectionModel.passe = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.subSectionModel.passe;
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

    if (angular.isDefined($scope.subSectionModel.passe)) {
      $scope.question.setAnswer($scope.subSectionModel.passe);
    }

    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.pole_emploi');
      } else {
        $state.go('^.pole_emploi');
      }
    };
  });
