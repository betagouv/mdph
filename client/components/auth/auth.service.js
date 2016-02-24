'use strict';

angular.module('impactApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookies, $q, $sessionStorage) {
    var currentUser = {};
    if ($cookies.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookies.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data.user);
          return cb({}, data);
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookies.remove('token');
        $sessionStorage.$reset();
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookies.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },

          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        },

        function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Change email
       *
       * @param  {String}   newEmail
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changeInfo: function(newName, newEmail, newBirthDate, callback) {
        var cb = callback || angular.noop;

        return User.changeInfo({ id: currentUser._id }, {
          newName: newName,
          newEmail: newEmail,
          newBirthDate: newBirthDate
        }, function(user) {
          return cb(user);
        },

        function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Waits for currentUser to resolve before getting all available info on authenticated user
       */
      getCurrentUserAsync: function(cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function(user) {
            cb(user);
          });
        } else {
          return currentUser;
        }
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if (currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Check if a user is from an mdph
       *
       * @return {Boolean}
       */
      isAdminMdph: function() {
        return currentUser.role === 'adminMdph';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookies.get('token');
      }
    };
  });
