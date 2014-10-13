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
          isLoggedIn: function(Auth) {
            return Auth.isLoggedIn();
          },

          currentForm:  function(RequestResource, isLoggedIn) {
            if (isLoggedIn) {
              return RequestResource.getMine().$promise;
            } else {
              return null;
            }
          }
        }
      });
  });
