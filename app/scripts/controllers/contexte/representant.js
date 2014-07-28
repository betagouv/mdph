'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:RepresentantCtrl
 * @description
 * # RepresentantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('RepresentantCtrl', function($scope, $state) {
    $scope.subtitle = 'Pour qui faites vous cette demande ?';

    $scope.personne = {};

    var initialRadioModel;
    if (angular.isDefined($scope.sectionModel.estRepresentant)) {
      initialRadioModel = $scope.sectionModel.estRepresentant.value;
      if (angular.isDefined($scope.sectionModel.estRepresentant.personne)) {
        $scope.personne = $scope.sectionModel.estRepresentant.personne;
      }
    } else {
      initialRadioModel = '';
    }

    $scope.sectionModel.estRepresentant.personne = $scope.personne;

    $scope.question = {
      'answers': [
        {label: 'Pour vous', value: false},
        {
          label: 'Pour un(e) autre',
          value: true,
          showDetail: true
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.sectionModel.estRepresentant = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.estRepresentant;
      if (angular.isUndefined(model)) {
        return true;
      }

      if (model.showDetail && !($scope.personne.prenom && $scope.personne.sexe)) {
        return true;
      }

      return false;
    };

    $scope.showDetail = function(value) {
      if (value.showDetail && !$state.includes('**.autre')) {
        $state.go('.autre');
      }
    };

    if (angular.isDefined($scope.sectionModel.estRepresentant)) {
      $scope.showDetail($scope.sectionModel.estRepresentant);
    }

    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.dossier');
      } else {
        $state.go('^.dossier');
      }
    };
  });
