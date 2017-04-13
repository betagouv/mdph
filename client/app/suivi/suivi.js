'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('suivi', {
        url: '/suivi',
        parent: 'layout',
        templateUrl: 'app/suivi/suivi.html',
        controller: function () {}
      });
  });
