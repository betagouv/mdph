'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinsLieuDeVieCtrl
 * @description
 * # BesoinsLieuDeVieCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinsLieuDeVieCtrl', function ($scope, $state) {

    $scope.question = {
      'title': 'Vos besoins dans la vie quotidienne',
      'subTitle': 'Besoin pour adapter le lieu de vie',
      'autre': ''
    };

    $scope.autre = {'label': 'Autre besoin', 'model': 'autre', 'value': false, 'detail': true};
    $scope.question.answers = [
      {'label': 'Je souhaite m\'équiper d\'un matériel spécifique', 'model': 'materiel', 'value': false},
      {'label': 'Je souhaite accéder à un autre lieu de vie plus adapté à ma situation de handicap', 'model': 'nouveau_lieu', 'value': false},
      {'label': 'Je souhaite aménager mon lieu de vie', 'model': 'amenagement', 'value': false},
      $scope.autre
    ];

    $scope.$watch('autre.value', function() {
      if ($scope.autre.value) {
        $state.go('form.vos_besoins.lieu_de_vie.autre');
      }
    });

    $scope.isNextStepDisabled = function() {
      return false;
    };

    $scope.nextStep = function() {
      var $result = [];
      angular.forEach($scope.question.answers, function(answer) {
        if (answer.value) {
          $result.push(answer.model);
        }
      });
      $scope.data.besoins.lieuDeVie = $result;
      $state.go('form.vos_besoins.securite');
    };
  });
