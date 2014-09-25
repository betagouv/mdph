'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('demande', {
        url: '/demande',
        templateUrl: 'app/demande/demande.html',
        controller: 'DemandeCtrl',
        resolve: {
          currentForm:  function(FormService) {
            return FormService.getCurrentForm();
          }
        }
      });
  });
