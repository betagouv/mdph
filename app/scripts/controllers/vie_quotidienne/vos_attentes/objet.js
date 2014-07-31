'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ObjetCtrl
 * @description
 * # ObjetCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ObjetCtrl', function($scope, $sessionStorage, $state) {

    $scope.subtitle = $scope.estRepresentant() ? 'Quels autres projets sont concernés par sa demande ?' : 'Quels autres projets sont concernés par votre demande ?';

    if (angular.isUndefined($scope.sectionModel.objet)) {
      $scope.sectionModel.objet = {
        'scolarite': false,
        'travail': false,
        'aidant': false,
        'carteStationnement': false,
        'carteInvalidite': false
      };
    }

    $scope.model = $scope.sectionModel;
    $scope.question = {
      'model': 'objet',
      'answers': [
        {
          'label': 'Votre scolarité ou vie étudiante',
          'labelRep': 'Sa scolarité ou vie étudiante',
          'model': 'scolarite'
        },
        {
          'label': 'Votre projet professionnel',
          'labelRep': 'Son projet professionnel',
          'model': 'travail'
        }
      ]
    };

    $scope.nextStep = function() {
      $sessionStorage.sectionScolarite.isEnabled = $scope.model.objet.scolarite;
      $sessionStorage.sectionTravail.isEnabled = $scope.model.objet.travail;
      $sessionStorage.sectionEnvoi.isEnabled = true;
      $state.go('^.aidant');
    };
  });
