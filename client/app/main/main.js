'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        resolve: {
          user: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        },
        views: {
          '': {
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
          },
          'navbar@main': {
            templateUrl: 'app/navbar/navbar.html',
            controller: 'NavbarCtrl'
          }
        }
      })
      .state('departement', {
        parent: 'main',
        url: '/mdph/:codeDepartement',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          mdph: function(MdphResource, $stateParams, $rootScope) {
            return MdphResource.get({zipcode: $stateParams.codeDepartement}).$promise.then(function(mdph) {
              $rootScope.mdph = mdph;
              return mdph;
            });
          }
        }
      });
  });
