'use strict';

(function() {
  angular.module('impactApp.auth')
    .run(function($rootScope, $state, Auth) {
      // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
      $rootScope.$on('$stateChangeStart', function(event, next, nextParams) {
        if (typeof next.authenticate !== 'undefined') {
          Auth.isLoggedIn(_.noop).then(is => {
            if (is) {
              if (typeof next.redirectTo !== 'undefined') {
                event.preventDefault();

                if (typeof next.redirectTo === 'string') {
                  $state.go(next.redirectTo, nextParams);
                } else {
                  let toParams = _.assign(nextParams, next.redirectTo.params);
                  $state.go(next.redirectTo.url, toParams);
                }
              }

              return;
            }

            event.preventDefault();
            $state.go('login', nextParams);
          });

          return;
        }

        if (typeof next.redirectTo !== 'undefined') {
          event.preventDefault();

          if (typeof next.redirectTo === 'string') {
            $state.go(next.redirectTo, nextParams);
          } else {
            let toParams = _.assign(nextParams, next.redirectTo.params);
            $state.go(next.redirectTo.url, toParams);
          }
        }

        return;
      });
    });
})();
