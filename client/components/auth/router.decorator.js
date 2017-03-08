'use strict';

(function() {
  angular.module('impactApp.auth')
    .run(function($rootScope, $state, Auth) {
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
              return;
            }

            event.preventDefault();
            $state.go('login', nextParams);
          });
        }
      });
    });
})();
