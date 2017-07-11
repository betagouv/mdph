'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('profil.unconfirmed', {
    url: '/unconfirmed',
    templateUrl: 'app/profil/unconfirmed/unconfirmed.html'
  });
});
