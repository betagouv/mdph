'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form', '/form/contexte');
    $stateProvider
      .state('form', {
        url: '/form',
        templateUrl: 'app/form/form.html',
        controller: 'FormCtrl',
        resolve: {
          currentForm:  function($http) {
            return $http.get('/api/forms/mine').then(function(result) {
              return result.data === '404' ? undefined : result.data;
            }).catch(function() {
              return undefined;
            });
           }
        }
      });
  });
