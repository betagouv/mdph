'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinsSocialCtrl
 * @description
 * # BesoinsSocialCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinsSocialCtrl', function ($scope, $state, isAdult) {

    $scope.question = {
      'title': 'Vos besoins dans la vie quotidienne',
      'subTitle': 'Besoin d\'aide dans vos relations sociales et familiales',
      'autre': ''
    };

    $scope.autre = {'label': 'Autre besoin', 'model': 'autre', 'value': false, 'detail': true};
    $scope.question.answers = [
      {'label': 'Pour les relations avec vos voisins, amis et votre famille', 'model': 'proches', 'value': false},
      {'label': 'Pour avoir des activités culturelles, sportives et de loisirs', 'model': 'loisirs', 'value': false}
    ];
    if (isAdult($scope.data.dateNaissance)) {
      $scope.question.answers.push(
        {'label': 'Pour vous occuper de votre famille', 'model': 'famille', 'value': false},
        {'label': 'Pour vous accompagner dans votre vie citoyenne (ex: aller voter, vie associative ...)',
          'model': 'citoyen', 'value': false}
      );
    }
    $scope.question.answers.push(
      $scope.autre
    );

    $scope.$watch('autre.value', function() {
      if ($scope.autre.value) {
        $state.go('form.vos_besoins.social.autre');
      }
    });

    $scope.nextStep = function() {
      var $result = [];
      angular.forEach($scope.question.answers, function(answer) {
        if (answer.value) {
          $result.push(answer.model);
        }
      });
      $scope.data.besoins.social = $result;
      $state.go('form.vos_besoins.lieu_de_vie');
    };
  });
