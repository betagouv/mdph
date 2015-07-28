'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('choix_mdph', {
        url: '/choix_mdph',
        templateUrl: 'app/choix_mdph/choix_mdph.html',
        controller: 'ChoixMdphCtrl',
        resolve: {
          mdphs: function($http) {
            return $http.get('/api/mdphs/list').then(function(result) {
              return result.data;
            });
          }
        }
      });
  });
