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

  const samplePrestations = {
      cartestationnement: {
        id: 'cartestationnement'
      },
      carteinvalidite: {
        id: 'carteinvalidite',
      },
      aeeh: {
        id: 'aeeh',
      },
      aah: {
        id: 'aah',
      },
      complement: {
        id: 'complement',
      },
      pch: {
        id: 'pch',
      },
      rqth: {
        id: 'rqth',
      },
      crp_cpo_ueros: {
        id: 'crp_cpo_ueros',
      },
      esat: {
        id: 'esat',
      },
      marche_travail: {
        id: 'marche_travail',
      },
      marche_travail_acc: {
        id: 'marche_travail_acc',
      },
      av: {
        id: 'av',
      },
      ems: {
        id: 'ems',
      },
      pps: {
        id: 'pps',
      },
      orp: {
        id: 'orp',
      },
      formation: {
        id: 'formation',
      },
      sms: {
        id: 'sms',
      },
      sms_enfant: {
        id: 'sms_enfant',
      },
      ac: {
        id: 'ac',
      },
      acfp: {
        id: 'acfp',
      }
    };

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
        toastr,
        prestations: samplePrestations
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
        toastr,
        prestations: samplePrestations
      });
    });

    it('should select the right prestations', function() {
      //given
      controller.cartestationnement = _.assign(controller.cartestationnement, {choice: true});
      controller.carteinvalidite = _.assign(controller.carteinvalidite, {choice: true, renouvellement: true});

      console.log('$scope', $scope);

      $scope.submit({$valid: true});

      //then
      expect($scope.request.renouvellements[0]).toEqual('carteinvalidite');
      expect($scope.request.prestations[0]).toEqual('cartestationnement');
    });

  });

});
