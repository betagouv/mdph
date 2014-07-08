'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinsQuotidienCtrl
 * @description
 * # BesoinsQuotidienCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinsQuotidienCtrl', function ($scope, $state, isAdult) {

    $scope.question = {
      'title': 'Vos besoins dans la vie quotidienne',
      'subTitle': 'Vos besoins d\'aide',
      'autre': ''
    };

    $scope.autre = {'label': 'Autre besoins', 'model': 'autre', 'value': false, 'detail': true};
    $scope.question.answers = [
      {'label': 'Pour l\'hygiène corporelle (se laver, aller aux toilette, s\'habiller)', 'model': 'hygiene', 'value': false},
      {'label': 'Pour faire les courses', 'model': 'courses', 'value': false}
    ];
    if (isAdult($scope.data.dateNaissance)) {
      $scope.question.answers.push(
        {'label': 'Pour faire le ménage et l\'entretien des vêtements', 'model': 'menage', 'value': false},
        {'label': 'Pour préparer les repas', 'model': 'cuisine', 'value': false},
        {'label': 'Pour gérer votre budget et répondre à vos obligations (assurances, impôts... )', 'model': 'budget', 'value': false}
      );
    }
    $scope.question.answers.push(
      {'label': 'Pour prendre les repas', 'model': 'repas', 'value': false},
      {'label': 'Pour prendre soin de sa santé (suivre un traitement, aller en consultation... )', 'model': 'sante', 'value': false},
      $scope.autre
    );

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
