'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinsSecuriteCtrl
 * @description
 * # BesoinsSecuriteCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinsSecuriteCtrl', function ($scope, $state) {

    $scope.question = {
      'title': 'Vos besoins dans la vie quotidienne',
      'subTitle': 'Besoin d\'aide pour assurer votre sécurité',
      'autre': ''
    };

    $scope.question.answers = [
      {'label': 'A l\'intérieur du lieu de vie', 'model': 'interieur', 'value': false},
      {'label': 'En dehors du lieu de vie', 'model': 'exterieur', 'value': false}
    ];

    $scope.nextStep = function() {
      var $result = [];
      angular.forEach($scope.question.answers, function(answer) {
        if (answer.value) {
          $result.push(answer.model);
        }
      });
      $scope.data.besoins.securite = $result;
      $state.go('form.vos_besoins.securite');
    };
  });
