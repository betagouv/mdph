'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '',
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
      });
  });
