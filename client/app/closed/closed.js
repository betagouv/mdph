'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('closed', {
        parent: 'layout',
        url: 'closed',
        templateUrl: 'app/closed/closed.html',
        controller: 'ClosedCtrl',
        controllerAs: 'closedCtrl',
      });
  });
