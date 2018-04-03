'use strict';

describe('SignupCtrl', function() {
  let $scope;
  let $controller;
  let $q;
  let currentMdph = {
    zipcode: 'test'
  };
  let $state = {
    go() {},

    current: {
      data: {
        forms: {}
      }
    }
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

  describe('toggleType', function() {
    beforeEach(function() {
      $controller('SignupCtrl', { $scope, $state, currentMdph });
    });

    describe('password to text', function() {
      it('should toggle the input type', function() {
        $scope.inputType = 'password';
        $scope.toggleType();
        expect($scope.inputType).toBe('text');
      });
    });

    describe('text to password', function() {
      it('should toggle the input type', function() {
        $scope.inputType = 'text';
        $scope.toggleType();
        expect($scope.inputType).toBe('password');
      });
    });
  });

  describe('resetMongooseError', function() {
    let fakeForm = {
      fakeField: {
        $setValidity() {}
      }
    };

    beforeEach(function() {
      $controller('SignupCtrl', { $scope, $state, currentMdph });
      spyOn(fakeForm.fakeField, '$setValidity');
    });

    it('should remove mongoose error from the field', function() {
      $scope.resetMongooseError(fakeForm, 'fakeField');
      expect(fakeForm.fakeField.$setValidity).toHaveBeenCalled();
      expect(fakeForm.fakeField.$setValidity).toHaveBeenCalledWith('mongoose', true);
    });
  });

  describe('register', function() {
    let fakeForm = {
      $valid: true,
      email: {
        $modelValue: 'test@test.com',
        $setValidity() {}
      },
      password: {
        $modelValue: '1234',
        $setValidity() {}
      }
    };

    describe('with correct values', function() {
      let fakeCreatedUser = {
        profile: '1234'
      };

      let Auth = {
        createUser() {
          return $q.resolve(fakeCreatedUser);
        }
      };

      beforeEach(function() {
        $controller('SignupCtrl', {
          $scope,
          $state,
          Auth,
          currentMdph
        });
      });

      it('should create the user, its profile and redirect to the page beneficiaire', function() {
        $scope.register(fakeForm);
        $scope.$apply();

        expect($state.go).toHaveBeenCalled();
        expect($state.go.calls.argsFor(0)[0]).toEqual('profil.beneficiaire');
        expect($state.go.calls.argsFor(0)[1]).toEqual({profileId: fakeCreatedUser.profile});
      });
    });

    describe('with incorrect values', function() {
      let fakeError = {
        data: {
          errors: {
            email: {
              message: 'Cette adresse est déjà utilisée.',
            }
          }
        }
      };

      let Auth = {
        createUser() {
          return $q.reject(fakeError);
        }
      };

      beforeEach(function() {
        $controller('SignupCtrl', {
          $scope,
          $state,
          Auth,
          currentMdph
        });
      });

      it('should explicit the error on the form', function() {
        $scope.register(fakeForm);
        $scope.$apply();

        expect($scope.errors.email).toEqual(fakeError.data.errors.email.message);
      });
    });
  });
});
