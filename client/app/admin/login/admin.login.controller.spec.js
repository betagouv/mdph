'use strict';

describe('EvaluationLoginCtrl', function() {
  let $controller;
  let $q;
  let $scope;
  let fakeUser = {
    mdph: {
      zipcode: 14
    }
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

  beforeEach(function() {
    module('impactApp');
    spyOn($state, 'go');
  });

  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($rootScope, _$controller_, _$q_) {
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $q = _$q_;
  }));

  describe('login', function() {
    describe('with an error', function() {
      let Auth = {
        loginAgent() {
          return $q.reject({message:'error message'});
        }
      };

      beforeEach(function() {
          $controller('EvaluationLoginCtrl', {
            $rootScope: {},
            $scope,
            Auth,
            $location: {},
            $state,
            currentUser: {mdph: {zipcode: 14}}
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
        loginAgent() {
          return $q.resolve(fakeUser);
        },

        hasRole(user, role) {
          if (role === 'admin') {
            return true;
          }

          return false;
        }
      };

      beforeEach(function() {
          $controller('EvaluationLoginCtrl', {
            $rootScope: {},
            $scope,
            Auth,
            $location: {},
            $state,
            currentUser: fakeUser
          });
        });

      it('should go to the back office of the current user', function() {
        $scope.login(fakeForm);
        $scope.$apply();

        expect($state.go).toHaveBeenCalled();
        expect($state.go.calls.argsFor(0)[0]).toEqual('evaluation.dashboard');
        expect($state.go.calls.argsFor(0)[1]).toEqual({currentUser: fakeUser});
      });
    });

    describe('adminMdph', function() {
      let Auth = {
        loginAgent() {
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
          $controller('EvaluationLoginCtrl', {
            $rootScope: {},
            $scope,
            Auth,
            $location: {},
            $state,
            currentUser: fakeUser
          });
        });

      it('should go to the back office of the current user', function() {
        $scope.login(fakeForm);
        $scope.$apply();

        expect($state.go).toHaveBeenCalled();
        expect($state.go.calls.argsFor(0)[0]).toEqual('evaluation.dashboard');
        expect($state.go.calls.argsFor(0)[1]).toEqual({currentUser: fakeUser});
      });
    });
  });
});
