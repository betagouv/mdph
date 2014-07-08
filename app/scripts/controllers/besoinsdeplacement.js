'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinsDeplacementCtrl
 * @description
 * # BesoinsDeplacementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinsDeplacementCtrl', function ($scope, $state, isAdult) {

    $scope.question = {
      'title': 'Vos besoins dans la vie quotidienne',
      'subTitle': 'Besoin d\'aide pour vous déplacer',
      'autre': ''
    };

    $scope.autre = {'label': 'Autre besoin', 'model': 'autre', 'value': false, 'detail': true};
    $scope.question.answers = [
      {'label': 'Pour se déplacer au sein du domicile', 'model': 'intra_domicile', 'value': false},
      {'label': 'Pour sortir du domicile et y accéder', 'model': 'acces_domicile', 'value': false},
      {'label': 'Pour se déplacer dans les espaces publics', 'model': 'public', 'value': false},
      {'label': 'Pour utiliser les transports en commun', 'model': 'transports', 'value': false},
      {'label': 'Pour partir en vacances', 'model': 'vacances', 'value': false}
    ];
    if (isAdult($scope.data.dateNaissance)) {
      $scope.question.answers.push(
        {'label': 'Adapter le véhicule pour pouvoir conduire', 'model': 'conduite', 'value': false}
      );
    }
    $scope.question.answers.push(
      $scope.autre
    );

    $scope.$watch('autre.value', function() {
      if ($scope.autre.value) {
        $state.go('form.vos_besoins.deplacement.autre');
      }
    });

    $scope.nextStep = function() {
      var $result = [];
      angular.forEach($scope.question.answers, function(answer) {
        if (answer.value) {
          $result.push(answer.model);
        }
      });
      $scope.data.besoins.deplacement = $result;
      $state.go('form.vos_besoins.social');
    };
  });
