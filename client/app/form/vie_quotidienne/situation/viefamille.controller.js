'use strict';

angular.module('impactApp')
  .controller('VieFamilleCtrl', function($scope, $state) {
    $scope.subtitle = $scope.estRepresentant() ? 'Avec qui vit-t-' + $scope.getPronoun() + ' ?' : 'Avec qui vivez-vous ?';

    if (angular.isUndefined($scope.sectionModel.famille)) {
      $scope.sectionModel.famille = {};
    }

    $scope.question = {
      model: 'famille',
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
        {
          label: 'Autre',
          value: 'autre',
          detail: $scope.sectionModel.famille.detail,
          detailUrl: 'components/detail/precisez.html'
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var answer = $scope.sectionModel.famille;
      if (angular.isUndefined(answer.value)) {
        return true;
      }

      if (answer.value === 'autre' && !answer.detail) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.logement');
    };
  });
