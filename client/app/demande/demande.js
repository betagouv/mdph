'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('demande', {
        url: '/demande',
        templateUrl: 'app/demande/demande.html',
        controller: 'DemandeCtrl',
        resolve: {
          currentForm:  function($http) {
              return $http({method: 'GET', url: '/api/forms/mine'}).catch(function() {return undefined;});
           }
        }
      });
  });
