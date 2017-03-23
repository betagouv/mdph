(function(angular, undefined) {
  'use strict';

  angular
    .module('impactApp.constants', [])
    .constant('appConfig',
      { userRoles:['user', 'adminMdph', 'admin'],
        banUrl : 'https://api-adresse.data.gouv.fr/search/'
      }
    );

})(angular);
