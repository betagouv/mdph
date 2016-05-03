'use strict';

(function() {
  function authInterceptor($rootScope, $q, $cookies, $injector, $window) {
    var state;

    return {
      // Add authorization token to headers
      request(config) {
        config.headers = config.headers || {};

        // Need to test this on IE
        // && Util.isSameOrigin(config.url)
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }

        return config;
      },

      // Intercept 401s and redirect you to login
      responseError(response) {
        if (response.status === 401) {
          var path = $window.location.pathname.split('/');
          if (path[1] === 'mdph') {
            (state || (state = $injector.get('$state'))).go('login', {codeDepartement: path[2]});
          } else {
            (state || (state = $injector.get('$state'))).go('main');
          }

          // remove any stale tokens
          $cookies.remove('token');
        }

        return $q.reject(response);
      }
    };
  }

  angular.module('impactApp.auth')
    .factory('authInterceptor', authInterceptor);

})();
