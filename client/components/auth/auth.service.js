'use strict';

(function() {

  function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
    var safeCb = Util.safeCb;
    var currentUser = {};

    if ($cookies.get('token') && $location.path() !== '/logout') {
      currentUser = User.get();
    }

    var Auth = {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      login({email, password}, callback) {
        return $http.post('/auth/local', {
          email: email,
          password: password
        })
        .then(res => {
          $cookies.put('token', res.data.token);
          currentUser = User.get({user: res.data.user});
          return currentUser.$promise;
        })
        .then(user => {
          safeCb(callback)(null, user);
          return user;
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
      },

      /**
       * Authenticate only Agent and save token
       *
       * @param  {Object}   user     - login agent info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      loginAgent({email, password}, callback) {
        return $http.post('/auth/local', {
          email: email,
          password: password
        })
        .then(res => {
          $cookies.put('token', res.data.token);
          currentUser = User.get({user: res.data.user});
          return currentUser.$promise;
        })
        .then(user => {
          safeCb(callback)(null, user);
          return user;
        })
        .then(user => {

          if (Auth.isAdminMdph(user, user.mdph)) {
            return user;
          } else {
            Auth.logout();
            return $q.reject({data: {message: 'Vous n\'avez pas les droits nécessaires pour vous connecter'}});
          }
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
      },

      /**
       * Authenticate only Admin and save token
       *
       * @param  {Object}   user     - login admin info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      loginAdmin({email, password}, callback) {
        return $http.post('/auth/local', {
          email: email,
          password: password
        })
        .then(res => {
          $cookies.put('token', res.data.token);
          currentUser = User.get();
          return currentUser.$promise;
        })
        .then(user => {
          safeCb(callback)(null, user);
          return user;
        })
        .then(user => {

          if (Auth.isAdmin(user)) {
            return user;
          } else {
            Auth.logout();
            return $q.reject({data: {message: 'Vous n\'avez pas les droits nécessaires pour vous connecter'}});
          }
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
      },

      /**
       * Delete access token and user info
       */
      logout() {
        $cookies.remove('token', { path: '/' });
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      createUser(user, callback) {
        return User.save(user,
          function(data) {
            $cookies.put('token', data.token);
            currentUser = User.get();
            return safeCb(callback)(null, user);
          },

          function(err) {
            Auth.logout();
            return safeCb(callback)(err);
          }).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional, function(error, user)
       * @return {Promise}
       */
      changePassword(oldPassword, newPassword, callback) {
        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        },

        function() {
          return safeCb(callback)(null);
        },

        function(err) {
          return safeCb(callback)(err);
        }).$promise;
      },

      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = (currentUser.hasOwnProperty('$promise')) ?
          currentUser.$promise : currentUser;
        return $q.when(value)
          .then(user => {
            safeCb(callback)(user);
            return user;
          }, () => {
            safeCb(callback)({});
            return {};
          });
      },

      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return Auth.getCurrentUser(null)
          .then(user => {
            var is = user.hasOwnProperty('role');
            safeCb(callback)(is);
            return is;
          });
      },

      /**
        * Check if a user has a specified role or higher
        *   (synchronous|asynchronous)
        *
        * @param  {String}     role     - the role to check against
        * @param  {Function|*} callback - optional, function(has)
        * @return {Bool|Promise}
        */
      hasRole(user, role, callback) {
        var has = (user && user.hasOwnProperty('role')) ? user.role === role : false;

        safeCb(callback)(has);
        return has;
      },

      /**
        * Check if a user has a specified role of array roles
        *   (synchronous|asynchronous)
        *
        * @param  {Object}   user - the user
        * @param  {Array of String}  roles - the roles authorized
        * @param  {Function|*} callback - optional, function(has)
        * @return {Bool|Promise}
        */
      isAuthorized(user, roles, callback) {
        var authorized = (user && user.hasOwnProperty('role')) ? roles.indexOf(user.role) !== -1 : false;

        safeCb(callback)(authorized);
        return authorized;
      },

      /**
        * Check if a user can access an mdph admin
        *   (synchronous|asynchronous)
        *
        * @param  {String} mdph
        * @return {Bool|Promise}
        */
      isAdminMdph(user, mdph) {
        if (Auth.hasRole(user, 'adminMdph')) {
          return user.mdph.zipcode === mdph.zipcode;
        }

        return false;
      },

      /**
        * Check if a user can access an admin
        *   (synchronous|asynchronous)
        *
        * @return {Bool|Promise}
        */
      isAdmin(user) {
        return Auth.hasRole(user, 'admin');
      },

      /**
        * Check if a user can access an user
        *   (synchronous|asynchronous)
        *
        * @return {Bool|Promise}
        */
      isUser(user) {
        return Auth.hasRole(user, 'user');
      },

      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken() {
        return $cookies.get('token');
      }
    };

    return Auth;
  }

  angular.module('impactApp.auth').factory('Auth', AuthService);

})();
