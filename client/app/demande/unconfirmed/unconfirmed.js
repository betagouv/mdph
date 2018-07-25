'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('demande.unconfirmed', {
    url: '/unconfirmed',
    templateUrl: 'app/demande/unconfirmed/unconfirmed.html',
    authenticate: true,
    authorized: ['user']
  });
});
