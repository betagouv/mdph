'use strict';

angular.module('impactApp')
  .controller('DeplacementCtrl', function($scope, $state) {

    if ($scope.estRepresentant()) {
      $scope.subtitle ='Quels sont ses besoins d\'aide pour se déplacer ?';
    } else {
      $scope.subtitle ='Quels sont vos besoins d\'aide pour se déplacer ?';
    }

    if (angular.isUndefined($scope.subSectionModel.deplacement)) {
      $scope.subSectionModel.deplacement = {
        'besoins': {},
        'detail': ''
      };
    }

    $scope.model = $scope.subSectionModel.deplacement;
    $scope.question = {
      'model': 'besoins',
      'answers':[
        {'label': 'Pour se déplacer au sein du domicile', 'model': 'intraDomicile'},
        {'label': 'Pour sortir du domicile et y accéder', 'model': 'accesDomicile'},
        {'label': 'Pour se déplacer à l\'extérieur du domicile', 'model': 'public'},
        {'label': 'Pour utiliser les transports en commun', 'model': 'transports'},
        {'label': 'Pour partir en vacances', 'model': 'vacances'},
        {'label': 'Pour adapter le véhicule pour pouvoir conduire', 'model': 'conduite', 'onlyAdult': true},
        {'label': 'Autre besoin', 'model': 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.social');
    };
  });
