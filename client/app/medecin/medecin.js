'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('medecin', {
        url: '/medecin',
        templateUrl: 'app/medecin/medecin.html',
        controller: 'PartenaireCtrl',
        resolve: {
          type: function() {
            return 'certificatMedical';
          }
        }
      });
  });
