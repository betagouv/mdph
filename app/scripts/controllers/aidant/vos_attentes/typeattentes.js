'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TypeAttenteAidantCtrl
 * @description
 * # TypeAttenteAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TypeAttenteAidantCtrl', function ($scope, $state) {

    $scope.subtitle = 'Quelles sont vos attentes en tant qu\'aidant familial ?';

    if (angular.isUndefined($scope.sectionModel.typeAttente)) {
      $scope.sectionModel.typeAttente = {
        attentes: {
          'repos': false,
          'imprevu': false,
          'vacances': false,
          'professionnel': false,
          'social': false,

          'finance': false,
          'echanges': false,
          'psychologique': false,
          'vieillesse': false,
          'conseil': false,
          'autre': false
        },
        detail: ''
      };
    }

    $scope.model = $scope.sectionModel.typeAttente;
    $scope.question = {
      model: 'attentes',
      answers:
      [
        {'label': 'Pouvoir vous reposer au quotidien', 'model': 'repos'},
        {'label': 'Pouvoir vous faire remplacer en cas d’un imprévu', 'model': 'imprevu'},
        {'label': 'Pouvoir vous faire remplacer pour partir en week-end/vacances', 'model': 'vacances'},
        {'label': 'Reprendre/renforcer/maintenir votre activité professionnelle', 'model': 'professionnel'},
        {'label': 'Reprendre/renforcer/maintenir vos liens sociaux', 'model': 'social'},

        {'label': 'Obtenir une contre-partie financière', 'model': 'finance'},
        {'label': 'Echanger avec d’autres aidants', 'model': 'echanges'},
        {'label': 'Avoir un soutien psychologique', 'model': 'psychologique'},
        {'label': 'Etre affilié gratuitement à l’assurance vieillesse', 'model': 'vieillesse'},
        {'label': 'Etre conseillé pour mieux faire face au handicap de votre proche', 'model': 'conseil'},

        {'label': 'Autre attente', 'model': 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.structure');
    };
  });
