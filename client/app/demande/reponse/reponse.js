'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('demande.reponse', {
        url: '/reponse',
        templateUrl: 'app/demande/reponse/reponse.html'
      });
  });
