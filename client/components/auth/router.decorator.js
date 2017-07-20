'use strict';

(function() {
  angular.module('impactApp.auth')
    .run(function($rootScope, $state, Auth, $window) {
      $rootScope.$on('$stateChangeStart', function(event, next, nextParams) {

        if (!next.authenticate && !next.redirectTo) {
          return;
        }

        if (next.redirectTo) {
          event.preventDefault();

          if (typeof next.redirectTo === 'string') {
            $state.go(next.redirectTo, nextParams);
          } else {
            let toParams = _.assign(nextParams, next.redirectTo.params);
            $state.go(next.redirectTo.url, toParams);
          }

          return;
        }

        if (next.authenticate) {
          Auth.isLoggedIn(_.noop).then(is => {
            if (is) {
              const path = $window.location.pathname.split('/');
              if (path[1] === 'evaluation') {
                const user = Auth.getCurrentUser();
                if (!Auth.hasRole(user, 'adminMdph')) {
                  Auth.logout();
                  $state.go('evaluation.login', nextParams);
                }
              }

              return;
            }

            event.preventDefault();

            var path = $window.location.pathname.split('/');
            if (path[1] === 'evaluation') {
              $state.go('evaluation.login', nextParams);
            } else {
              $state.go('login', nextParams);
            }

          });
        }
      });
    });
})();
