'use strict';

describe('LoginCtrl', function() {
  let $controller;
  let $q;
  let $scope;
  let currentMdph = {
    zipcode: 14
  };
  let fakeForm = {
    $valid: true,
    email: {
      $modelValue: 'test@test.com'
    },
    password: {
      $modelValue: '1234'
    }
  };

  let $state = {
    go() {}
  };

  let $httpBackend;

  beforeEach(function() {
    module('impactApp');
    spyOn($state, 'go');
  });

  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($rootScope, _$controller_, _$q_, _$httpBackend_) {
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
  }));

  describe('login', function() {
    describe('with an error', function() {
      let Auth = {
        login() {
          return $q.reject({message:'error message'});
        }
      };

      beforeEach(function() {
          $controller('LoginCtrl', {
            $rootScope: {},
            $scope,
            Auth,
            $location: {},
            $state,
            currentMdph
          });
        });

      it('should catch the error and put the error message in the scope', function() {
        $scope.login(fakeForm);
        $scope.$apply();

        expect($scope.error).toEqual('error message');
      });

    });

    describe('admin', function() {
      let Auth = {
        login() {
          return $q.resolve({});
        },

        hasRole(user, role) {
          if (role === 'admin') {
            return true;
          }

          return false;
        }
      };

      beforeEach(function() {
          $controller('LoginCtrl', {
            $rootScope: {},
            $scope,
            Auth,
            $location: {},
            $state,
            currentMdph
          });
        });

      it('should go to the back office of the current mdph', function() {
        $scope.login(fakeForm);
        $scope.$apply();

        expect($state.go).toHaveBeenCalled();
        expect($state.go.calls.argsFor(0)[0]).toEqual('dashboard.workflow');
        expect($state.go.calls.argsFor(0)[1]).toEqual({codeDepartement: currentMdph.zipcode});
      });
    });

    describe('adminMdph', function() {
      let fakeUser = {
        mdph: {
          zipcode: 54
        }
      };

      let Auth = {
        login() {
          return $q.resolve(fakeUser);
        },

        hasRole(user, role) {
          if (role === 'adminMdph') {
            return true;
          }

          return false;
        }
      };

      beforeEach(function() {
          $controller('LoginCtrl', {
            $rootScope: {},
            $scope,
            Auth,
            $location: {},
            $state,
            currentMdph
          });
        });

      it('should go to the back office of the mdph of the current user', function() {
        $scope.login(fakeForm);
        $scope.$apply();

        expect($state.go).toHaveBeenCalled();
        expect($state.go.calls.argsFor(0)[0]).toEqual('dashboard.workflow');
        expect($state.go.calls.argsFor(0)[1]).toEqual({codeDepartement: fakeUser.mdph.zipcode});
      });
    });

    describe('user with only one profile', function() {
      let fakeUser = {
        _id: '1',
      };

      let Auth = {
        login() {
          return $q.resolve(fakeUser);
        },

        hasRole(user, role) {
          if (role === 'user') {
            return true;
          }

          return false;
        }
      };

      // Mock ressource call to send back a count of 1
      let ProfileResource = {
        query() {
          return {
            $promise: {
              then(callback) {
                callback([{_id: 1}]);
              }
            }
          };
        }
      };

      beforeEach(function() {
        $controller('LoginCtrl', {
          $httpBackend,
          $rootScope: {},
          $scope,
          Auth,
          $location: {},
          $state,
          currentMdph,
          ProfileResource
        });
      });

      it('should go to the account settings of the user', function() {

        $httpBackend
          .whenGET('/api/users/1/profiles/1/requests/last')
          .respond(200, {status: 'validee'});
        $scope.login(fakeForm);
        $httpBackend.flush();
        $scope.$apply();
        expect($state.go).toHaveBeenCalled();

        //expect($state.go.calls.argsFor(0)[0]).toEqual('gestion_demande');
      });
    });

    describe('user with multiple profiles', function() {
      let fakeUser = {
        _id: '1'
      };

      let Auth = {
        login() {
          return $q.resolve(fakeUser);
        },

        hasRole(user, role) {
          if (role === 'user') {
            return true;
          }

          return false;
        }
      };

      // Mock ressource call to send back a count of 2
      let ProfileResource = {
        query() {
          return {
            $promise: {
              then(callback) {
                callback([{_id: 1},{_id: 2}]);
              }
            }
          };
        }
      };

      beforeEach(function() {
        $controller('LoginCtrl', {
          $httpBackend,
          $rootScope: {},
          $scope,
          Auth,
          $location: {},
          $state,
          currentMdph,
          ProfileResource
        });
      });

      it('should go to the profil\'s dashboard user page of the user', function() {

        $httpBackend
        .whenGET('/api/users/1/profiles/1/requests/last')
        .respond(200, {status: 'en_cours'});
        $httpBackend
        .whenGET('/api/users/1/profiles/2/requests/last')
        .respond(200, {status: 'emise'});
        $scope.login(fakeForm);
        $httpBackend.flush();
        $scope.$apply();
        expect($state.go).toHaveBeenCalled();

        //expect($state.go.calls.argsFor(0)[0]).toEqual('gestion_profil');
      });
    });
  });
});
