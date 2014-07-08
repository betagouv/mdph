'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinsQuotidienCtrl
 * @description
 * # BesoinsQuotidienCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinsQuotidienCtrl', function ($scope, $state) {

    $scope.question = {
      'title': 'Vos besoins dans la vie quotidienne',
      'subTitle': 'Vos besoins d\'aide',
      'autre': ''
    };
    
  //  $scope.isAdult = function($date) {
  //    return moment($date).isBefore(moment().subtract('y', 18));
  //  };

    $scope.hygiene = {'label': 'Pour l\'hygiène corporelle (se laver, aller aux toilette, s\'habiller)', 'model': 'hygiene', 'value': false};
    $scope.courses = {'label': 'Pour faire les courses', 'model': 'courses', 'value': false};
    $scope.repas = {'label': 'Pour prendre les repas', 'model': 'repas', 'value': false};
    $scope.sante = {'label': 'Pour prendre soin de sa santé (suivre un traitement, aller en consultation... )', 'model': 'sante', 'value': false};
    $scope.menage = {'label': 'Pour faire le ménage et l\'entretien des vêtements', 'model': 'menage', 'value': false};
    $scope.cuisine = {'label': 'Pour préparer les repas', 'model': 'cuisine', 'value': false};
    $scope.budget = {'label': 'Pour gérer votre budget et répondre à vos obligations (assurances, impôts... )', 'model': 'budget', 'value': false};
    $scope.autre = {'label': 'Autre besoins', 'model': 'autre', 'value': false, 'detail': true};
    
    $scope.question.answers = [
      $scope.hygiene,
      $scope.courses
    ];
    //if ($scope.isAdult($scope.data.dateNaissance)) {
    if (true) {
      $scope.question.answers += [
        $scope.menage,
        $scope.cuisine,
        $scope.budget
      ];
    }
    $scope.question.answers = [
      $scope.repas,
      $scope.sante,
      $scope.autre
    ];

    $scope.$watch('autre.value', function() {
      if ($scope.autre.value) {
        $state.go('form.vos_besoins.quotidien.autre');
      }
    });

    $scope.isNextStepDisabled = function() {
      return false;
    };

    $scope.nextStep = function() {
      var $result = [];
      angular.forEach($scope.question.answers, function(answer) {
        if (answer.value) {
          $result += answer.model;
        }
      });
      $scope.data.besoinsQuotidiens = $result;
      $state.go('form.vos_besoins');
    };
  });
