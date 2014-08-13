'use strict';

/**
 * @ngdoc service
 * @name impactApp.authentication
 * @description
 * # authentication
 * Service in the impactApp.
 */
angular.module('impactApp')
  .service('authentication', function($http, $timeout, $q, $sessionStorage) {
    this.login = function(credentials) {
      var login = $http.post('/login', credentials);
      login.success(function(user) {
        $sessionStorage.user = user;
        // $flash.clear();
      }).error(function(error) {
        error = error.error ? error.error : error;
        // $flash.show(error.message || error);
      });
      return login;
    };

    this.logout = function() {
      var logout = $http.get('/logout');
      logout.success(function() {
        delete $sessionStorage.user;
      });
      return logout;
    };

    this.user = function() {
      var user = $sessionStorage.user;
      if (user) {
        var deferred = $q.defer();
        $timeout(function() {
          deferred.resolve(user);
        }, 0);
        return deferred.promise;
      } else {
        return $http.get('/user');
      }
    };
});
