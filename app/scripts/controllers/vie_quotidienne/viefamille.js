'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VieFamilleCtrl
 * @description
 * # VieFamilleCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VieFamilleCtrl', function($scope, $state) {

    var initialDetail = ($scope.sectionModel.famille) ? $scope.sectionModel.famille.detail : '';
    var initialRadioModel = ($scope.sectionModel.famille) ? $scope.sectionModel.famille.value : '';

    $scope.subtitle = 'Avec qui ';
    $scope.subtitle += $scope.estRepresentant() ? ' vit-t-' + $scope.getPronoun() + ' ?' : ' vivez-vous ?';

    $scope.question = {
      answers: [
        {
          label: 'Avec vos parents',
          labelRep: 'Avec ses parents',
          value: 'parents'
        },
        {
          label: 'Seul(e)',
          labelRepMasc: 'Seul',
          labelRepFem: 'Seule',
          value: 'seul'
        },
        {
          label: 'En couple',
          value: 'couple',
          onlyAdult: true
        },
        {
          label: 'Avec vos enfants',
          labelRep: 'Avec ses enfants',
          value: 'enfants',
          onlyAdult: true
        },
        {label: 'Autre', value: 'autre', showDetail: true, detail: initialDetail}
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.sectionModel.famille = answer;
        $scope.showDetail(answer.value);
      }
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.famille;
      if (angular.isUndefined(model)) {
        return true;
      }

      if (model.value === 'autre' && model.detail === '') {
        return true;
      }

      return false;
    };

    $scope.showDetail = function(value) {
      if (value === 'autre' && !$state.includes('**.autre')) {
        $state.go('.autre');
      }
    };

    if (angular.isDefined($scope.sectionModel.famille)) {
      $scope.question.setAnswer($scope.sectionModel.famille);
    }

    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.logement');
      } else {
        $state.go('^.logement');
      }
    };
  });
