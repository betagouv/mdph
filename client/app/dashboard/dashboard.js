'use strict';

angular.module('impactApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/dashboard', '/dashboard/demandes');
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        parent: 'departement',
        templateUrl: 'app/dashboard/dashboard.html',
        authenticate: true,
        controller: function($scope, SectionBackConstants) {
          $scope.sections = SectionBackConstants;
        }
      });
  });
