'use strict';

angular.module('impactApp')
  .controller('TypeAideCtrl', function ($scope, $state, FormService) {

    if (FormService.estRepresentant($scope.formAnswers)) {
      $scope.subtitle ='Quelles sont ses attentes pour compenser son handicap ?';
    } else {
      $scope.subtitle ='Quelles sont vos attentes pour compenser votre handicap ?';
    }

    if (angular.isUndefined($scope.sectionModel.typeAide)) {
      $scope.sectionModel.typeAide = {
        attentes: {},
        detail: ''
      };
    }

    $scope.model = $scope.sectionModel.typeAide;
    $scope.question = {
      model: 'attentes',
      answers:
      [
        {label: 'Vivre à domicile', model: 'domicile'},
        {label: 'Une aide technique, du matériel ou équipement', model: 'materiel'},
        {label: 'Vivre en établissement', model: 'etablissement'},
        {
          label: 'Une aide financière, afin de vous\'assurer un revenu minimum',
          labelRep: 'Une aide financière, afin de lui\'assurer un revenu minimum',
          model: 'financierMinimum'
        },
        {
          label: 'Un aménagement de votre lieu de vie',
          labelRep: 'Un aménagement de son lieu de vie',
          model: 'amenagement'
        },
        {
          label: 'Une aide financière pour des dépenses liées à votre handicap',
          labelRep: 'Une aide financière pour des dépenses liées à son handicap',
          model: 'financierHandicap'
        },
        {
          label: 'Une aide humaine, avec quelqu\'un qui vient vous aider',
          labelRep: 'Une aide humaine, avec quelqu\'un qui vient l\'aider',
          model: 'humain'
        },
        {label: 'Une aide à la mobilité', model: 'mobilite'},
        {label: 'Autre besoin', model: 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.structure');
    };
  });
