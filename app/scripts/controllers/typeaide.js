'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TypeAideCtrl
 * @description
 * # TypeAideCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TypeAideCtrl', function ($scope, $state) {

    $scope.question = {
      'title': 'Vos attentes pour compenser votre handicap',
      'autre': ''
    };

    $scope.autre = {'label': 'Autre besoin', 'model': 'autre', 'value': false, 'detail': true};
    $scope.question.answers = [
      {'label': 'Une aide humaine', 'model': 'humain', 'value': false},
      {'label': 'Une aide matérielle', 'model': 'materiel', 'value': false},
      {'label': 'Une aide financière', 'model': 'financier', 'value': false},
      {'label': 'Une orientation vers un établissement médico-social', 'model': 'orientation_sante', 'value': false},
      {'label': 'Un accompagnement pas un service médico-social', 'model': 'medico_social', 'value': false},
      $scope.autre
    ];

    $scope.$watch('autre.value', function() {
      if ($scope.autre.value) {
        $state.go('form.vos_attentes.type_aide.autre');
      }
    });

    $scope.nextStep = function() {
      var $result = [];
      angular.forEach($scope.question.answers, function(answer) {
        if (answer.value) {
          $result.push(answer.model);
        }
      });
      $scope.data.attente = {'typeAide' : $result};
      $state.go('form.vos_attentes.structure');
    };
  });
