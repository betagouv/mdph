'use strict';

(function() {
  angular.module('impactApp.auth')
    .run(function($rootScope, $state, Auth) {
      // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
      $rootScope.$on('$stateChangeStart', function(event, next, nextParams) {
        if (typeof next.redirectTo !== 'undefined') {
          event.preventDefault();
          if (typeof next.redirectTo === 'string') {
            $state.go(next.redirectTo, nextParams);
          } else {
            var params = _.assign(nextParams, next.redirectTo.params);
            $state.go(next.redirectTo.url, params);
          }

          return;
        }

        if (typeof next.authenticate !== 'undefined') {
          Auth.isLoggedIn(_.noop).then(is => {
            if (is) {
              return;
            }

            event.preventDefault();
            $state.go('login');
          });

          return;
        }
      });
    });
})();
