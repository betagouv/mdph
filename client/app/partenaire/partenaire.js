'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('partenaire', {
        url: '/partenaire',
        templateUrl: 'app/partenaire/partenaire.html',
        controller: 'PartenaireCtrl'
      });
  });