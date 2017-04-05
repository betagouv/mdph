'use strict';

describe('Controller: demande', function() {
  let RequestService = {
    getCompletion() {
      return true;
    },

    postAction() {
      return {
        then() {
          return true;
        }
      };
    }
  };

  let toastr = {
    error() {}
  };

  let request = {
    user: 'userId',
    prestations: [],
    status: 'en_cours',
    $update() {}
  };

  let currentUser = {};

  // load the service's module
  beforeEach(module('impactApp'));

  it('should have 16 prestations', function() {
    //given
    var $scope = {};

    //when
    inject(function($controller) {
      $controller('DemandeCtrl', {
        $state: {
          go() {}
        },

        $scope,
        currentUser,
        request,
        RequestService,
        toastr
      });
    });

    expect($scope.prestations.length, 16);
  });

  it('should select the right prestations', function() {
    //given
    var $scope = {};

    //when
    inject(function($controller) {
      $controller('DemandeCtrl', {
        $state: {
          go() {}
        },

        $scope,
        currentUser,
        request,
        RequestService,
        toastr
      });
    });

    $scope.cartestationnement.choice = true;
    $scope.carteinvalidite.choice = true;
    $scope.carteinvalidite.renouvellement = true;
    $scope.submit({$valid: true});

    //then
    expect($scope.request.renouvellements[0]).toEqual('carteinvalidite');
    expect($scope.request.prestations[0]).toEqual('cartestationnement');

  });

});
