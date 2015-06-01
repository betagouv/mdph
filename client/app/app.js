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
  'ngMessages'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    $urlMatcherFactoryProvider.strictMode(false);
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s
      responseError: function(response) {
        if(response.status === 401) {
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $state, $window, $location, Auth, datepickerConfig) {
    datepickerConfig.datepickerMode = 'year';
    datepickerConfig.showWeeks = false;

    $rootScope.$on('$stateChangeSuccess', function(){
      if ($window._paq) {
        $window._paq.push(['setCustomUrl', $location.path()]);
        $window._paq.push(['trackPageView']);
      }
    });

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (toState.authenticate && !loggedIn) {
          $rootScope.returnToState = toState;
          $rootScope.returnToStateParams = toStateParams;

          event.preventDefault();
          $state.go('login');
        }
      });
    });
  });
