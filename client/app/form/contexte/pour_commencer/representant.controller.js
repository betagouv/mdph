'use strict';

angular.module('impactApp')
  .controller('RepresentantCtrl', function($scope, $state) {
    $scope.subtitle = 'Pour qui faites vous cette demande ?';

    if (angular.isUndefined($scope.sectionModel.estRepresentant)) {
      $scope.sectionModel.estRepresentant = {};
    }

    if (angular.isUndefined($scope.sectionModel.demandeur)) {
      $scope.sectionModel.demandeur = {};
    }

    $scope.question = {
      model: 'estRepresentant',
      answers: [
        {
          label: 'Pour vous',
          value: false,
          documents: [{category: 'obligatoire', id: 'carteIdentite'}]
        },
        {
          label: 'Pour une autre personne',
          value: true,
          detailUrl: 'components/detail/personne.html',
          documents: [{category: 'obligatoire', id: 'carteIdentite'}, {category: 'obligatoire', id: 'carteIdentiteRepresentant'}]
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var answer = $scope.sectionModel[$scope.question.model];

      if (angular.isUndefined(answer.value)) {
        return true;
      }
      if (answer.detailUrl) {
        var demandeur = $scope.sectionModel.demandeur;
        if (angular.isUndefined(demandeur)) {
          return true;
        }
        if (!demandeur.prenom || demandeur.prenom === '') {
          return true;
        }
        if (!demandeur.sexe) {
          return true;
        }
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.code_postal');
    };
  });
