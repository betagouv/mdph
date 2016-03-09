'use strict';

(function() {

  angular.module('impactApp.auth')
    .run(function($rootScope, $state, Auth) {
      // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
      $rootScope.$on('$stateChangeStart', function(event, next, nextParams) {
        if (!next.authenticate) {
          return;
        }

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

        if (typeof next.authenticate === 'string') {
          Auth.hasRole(next.authenticate, _.noop).then(has => {
            if (has) {
              return;
            }

            event.preventDefault();
            return Auth.isLoggedIn(_.noop).then(is => {
              $state.go(is ? 'departement' : 'login');
            });
          });
        } else {
          Auth.isLoggedIn(_.noop).then(is => {
            if (is) {
              return;
            }

            event.preventDefault();
            $state.go('departement');
          });
        }
      });
    });
})();
