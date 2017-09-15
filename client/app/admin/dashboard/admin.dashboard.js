'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin.dashboard', {
        url: '',
        parent: 'admin',
        authenticate: true,
        templateUrl: 'app/admin/dashboard/admin.dashboard.html',
        controller: 'AdminDashboardCtrl',
        controllerAs: 'adminDashboardCtrl',
      });
  });
