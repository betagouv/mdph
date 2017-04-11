'use strict';

describe('Controller: demande', function() {
  let $controller;

  const RequestService = {
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

  const toastr = {
    error() {}
  };

  const $state = {
    go() {}
  };

  let request = {
    user: 'userId',
    prestations: [],
    status: 'en_cours',
    $update() {}
  };

  const currentUser = {};

  // load the service's module
  beforeEach(module('impactApp'));

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('prestations list', () => {
    let controller;

    //given
    let $scope = {};

    beforeEach(function() {
      controller = $controller('DemandeCtrl', {
        $state,
        $scope,
        currentUser,
        request,
        RequestService,
        toastr
      });
    });

    it('should have 16 prestations', function() {
      expect(controller.prestations.length, 16);
    });
  });

  describe('prestations request', () => {
    let controller;

    //given
    let $scope = {};

    beforeEach(function() {
      controller = $controller('DemandeCtrl', {
        $state,
        $scope,
        currentUser,
        request,
        RequestService,
        toastr
      });
    });

    it('should select the right prestations', function() {
      //given
      controller.cartestationnement = _.assign(controller.cartestationnement, {choice: true});
      controller.carteinvalidite = _.assign(controller.carteinvalidite, {choice: true, renouvellement: true});

      $scope.submit({$valid: true});

      //then
      expect($scope.request.renouvellements[0]).toEqual('carteinvalidite');
      expect($scope.request.prestations[0]).toEqual('cartestationnement');
    });

  });

});
