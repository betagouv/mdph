(function(angular, undefined) {
  'use strict';

  angular
    .module('impactApp.constants', [])
    .constant('appConfig', {userRoles:['user', 'adminMdph', 'admin']});

})(angular);
