'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:QuotidienCtrl
 * @description
 * # QuotidienCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('QuotidienCtrl', function($scope, $state) {

    if ($scope.estRepresentant()) {
      $scope.subtitle ='Quels sont ses besoins d\'aide dans la vie quotidienne ?';
    } else {
      $scope.subtitle ='Quels sont vos besoins d\'aide dans la vie quotidienne ?';
    }

    if (angular.isUndefined($scope.subSectionModel.quotidien)) {
      $scope.subSectionModel.quotidien = {
        'besoins': {
        },
        'detail': ''
      };
    }

    $scope.model = $scope.subSectionModel.quotidien;
    $scope.question = {
      model: 'besoins',
      'answers': [
        {
          label: 'Pour l\'hygiène corporelle (se laver, aller aux toilette)',
          model: 'hygiene'
        },
        {
          label: 'Pour vous habiller (mettre et ôter vos vêtements, les choisir ....)',
          labelRep: 'Pour s\'habiller (mettre et ôter ses vêtements, les choisir ....)',
          model: 'habits'
        },
        {label: 'Pour faire les courses', model: 'courses'},
        {label: 'Pour faire le ménage et l\'entretien des vêtements', model: 'menage', 'onlyAdult': true},
        {label: 'Pour préparer les repas', model: 'cuisine', 'onlyAdult': true},
        {label: 'Pour prendre les repas', model: 'repas'},
        {label: 'Pour gérer votre budget et répondre à vos obligations (assurances, impôts... )', model: 'budget', 'onlyAdult': true},
        {
          label: 'Pour prendre soin de votre santé (suivre un traitement, aller en consultation... )',
          labelRep: 'Pour prendre soin de sa santé (suivre un traitement, aller en consultation... )',
          model: 'sante'
        },
        {label: 'Autre besoin', model: 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.deplacement');
    };
  });
