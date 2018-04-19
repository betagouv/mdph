'use strict';

angular.module('impactApp', [
    'impactApp.auth',
    'impactApp.constants',
    'impactApp.util',
    'ui.router',
    'ui.bootstrap',
    'ui.tree',
    'ui.mask',
    'ngStorage',
    'ngFileUpload',
    'ngMessages',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'chart.js',
    'toastr',
    'zxcvbn'
  ])
  .config(function($compileProvider, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider, $modalProvider, toastrConfig, treeConfig) {
    moment.locale('fr');
    $compileProvider.preAssignBindingsEnabled(true);
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $urlMatcherFactoryProvider.strictMode(false);
    $modalProvider.options.animation = false;
    angular.extend(toastrConfig, {
      progressBar: true,
      positionClass: 'toast-top-right'
    });
    treeConfig.dragClass = 'angular-ui-tree-drag';

    // disable IE ajax request caching
    //$httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
  })
  .run(function($rootScope, $window, $location, $state) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
      $window.scrollTo(0, 0);

      if (toState.data && toState.data.title) {
        $window.document.title = toState.data.title + ' | MDPH en ligne';
      } else {
        $window.document.title = 'MDPH en ligne';
      }

      if ($window._paq) {
        const anonymousParams = _(toStateParams)
          .keys()
          .reduce((acc, key) => {
            // White-list
            if (key === 'codeDepartement') {
              acc[key] = toStateParams[key];
            } else {
              acc[key] = `_${key}_`;
            }

            return acc;
          }, {});

        const withoutParamsUrl = $state.href(toState.name, anonymousParams, {absolute: true, inherit: false});

        $window._paq.push(['setCustomUrl', withoutParamsUrl]);
        $window._paq.push(['trackPageView']);
      }
    });
  });
