'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:LieuDeVieCtrl
 * @description
 * # LieuDeVieCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('LieuDeVieCtrl', function($scope, $state) {

    $scope.subtitle = 'Besoin d\'aide pour adapter votre lieu de vie';
    
    if (angular.isUndefined($scope.parentModel.lieuDeVie)) {
      $scope.parentModel.lieuDeVie = {
        'besoins': {
          'materiel': false,
          'nouveau_lieu': false,
          'amenagement': false,
          'autre': false
        },
        'detail': ''
      };
    }

    $scope.model = $scope.parentModel.lieuDeVie;
    $scope.question = {
      'model': 'besoins',
      'answers': [
        {'label': 'Je souhaite m\'équiper d\'un matériel spécifique', 'model': 'materiel'},
        {'label': 'Je souhaite accéder à un autre lieu de vie plus adapté à ma situation de handicap', 'model': 'nouveau_lieu'},
        {'label': 'Je souhaite aménager mon lieu de vie', 'model': 'amenagement'},
        {'label': 'Autre besoin', 'model': 'autre', 'detail': true}
      ]
    };

    $scope.showDetail = function() {
      $state.go('form.vie_quotidienne.vos_besoins.lieu_de_vie.autre');
    };

    $scope.nextStep = function() {
      $state.go('form.vie_quotidienne.vos_besoins.securite');
    };
  });
