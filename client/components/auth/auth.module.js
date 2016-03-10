'use strict';

angular.module('impactApp.auth', [
  'impactApp.constants',
  'impactApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
