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
    'toastr'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider, $modalProvider, toastrConfig) {
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
  })
  .factory('authInterceptor', function($rootScope, $q, $cookies) {
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }

        return config;
      },

      // Intercept 401s
      responseError: function($location, response) {
        if (response.status === 401) {
          $location.path('/login');

          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  })
  .run(function($rootScope, $state, $window, $location, Auth) {
    $rootScope.$on('$stateChangeSuccess', function() {
      if ($window._paq) {
        $window._paq.push(['setCustomUrl', $location.path()]);
        $window._paq.push(['trackPageView']);
      }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      if (toState.redirectTo) {
        event.preventDefault();
        if (typeof toState.redirectTo === 'string') {
          $state.go(toState.redirectTo, toStateParams);
        } else {
          var params = _.assign(toStateParams, toState.redirectTo.params);
          $state.go(toState.redirectTo.url, params);
        }
      } else {
        Auth.isLoggedInAsync(function(loggedIn) {
          if (toState.data && toState.data.title) {
            $rootScope.title = toState.data.title + ' - Votre MDPH en ligne';
          } else {
            $rootScope.title = 'Votre MDPH en ligne';
          }

          if (toState.authenticate && !loggedIn) {
            $rootScope.returnToState = toState;
            $rootScope.returnToStateParams = toStateParams;

            event.preventDefault();
            $state.go('login');
          }
        });
      }
    });
  });
