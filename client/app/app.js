'use strict';

angular.module('impactApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'ngAnimate',
    'ngFileUpload',
    'ngMessages',
    'chart.js',
    'ui.tree',
    'toastr',
    'ui.mask'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider, $modalProvider, toastrConfig, treeConfig) {
    moment.locale('fr');
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    $urlMatcherFactoryProvider.strictMode(false);
    $modalProvider.options.animation = false;
    angular.extend(toastrConfig, {
      progressBar: true,
      positionClass: 'toast-top-right'
    });
    treeConfig.dragClass = 'angular-ui-tree-drag';
  })
  .factory('authInterceptor', function($rootScope, $q, $cookies) {
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token') && !config.ignoreInterceptor) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }

        return config;
      },

      // Intercept 401s
      responseError: function(response) {
        switch (response.status) {
          case 401:
            $rootScope.$broadcast('event:auth-loginRequired', response);
            break;
          case 403:
            $rootScope.$broadcast('event:auth-forbidden', response);
            break;
        }

        return $q.reject(response);
      }
    };
  })
  .run(function($rootScope, $state, $window, $location, Auth, $cookies) {
    $rootScope.$on('$stateChangeSuccess', function() {
      if ($window._paq) {
        $window._paq.push(['setCustomUrl', $location.path()]);
        $window._paq.push(['trackPageView']);
      }
    });

    $rootScope.$on('event:auth-loginRequired', function() {
      $cookies.remove('token');
      $state.go('login');
    });

    $rootScope.$on('event:auth-forbidden', function() {
      // TODO: specific state for auth-forbidden
      $state.go('login');
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      if (toState.data && toState.data.title) {
        $rootScope.title = toState.data.title + ' - Votre MDPH en ligne';
      } else {
        $rootScope.title = 'Votre MDPH en ligne';
      }

      Auth.isLoggedInAsync(function(loggedIn) {
        if (toState.authenticate && !loggedIn) {
          $rootScope.returnToState = toState;
          $rootScope.returnToStateParams = toStateParams;

          event.preventDefault();
          $state.go('login');
        } else {
          if (toState.redirectTo) {
            event.preventDefault();
            if (typeof toState.redirectTo === 'string') {
              $state.go(toState.redirectTo, toStateParams);
            } else {
              var params = _.assign(toStateParams, toState.redirectTo.params);
              $state.go(toState.redirectTo.url, params);
            }
          }
        }
      });
    });
  });
