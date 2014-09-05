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
            return $http.get('/api/forms/mine').then(function(result) {
              return result.data;
            }).catch(function() {
              return undefined;
            });
           }
        }
      });
  });
