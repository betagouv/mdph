'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        parent: 'departement',
        templateUrl: 'app/dashboard/dashboard.html',
        authenticate: true,
        redirectTo: 'dashboard.workflow',
        controller: function($scope, SectionBackConstants) {
          $scope.sections = SectionBackConstants;
        },

        resolve: {
          currentUser: function(Auth) {
            return Auth.getCurrentUser();
          }
        }
      });
  });
