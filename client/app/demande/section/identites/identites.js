'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.identites';
    $stateProvider
      .state(index + '.nouvelle_identite', {
        url: '/nouvelle_identite',
        templateUrl: 'app/demande/section/identites/nouvelle_identite.html',
        controller: function() {}
      });
  });
