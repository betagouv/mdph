'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('recap', {
        url: '/recap',
        templateUrl: 'app/recap/recap.html',
        controller: 'RecapCtrl',
        resolve: {
          currentForm:  function(FormService) {
            return FormService.getCurrentForm();
           }
        }
      });
  });
