'use strict';

/* global _ */

describe('Controller: request', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  it('should be able to certify a partner', function () {
    //given
    var scope = {};
    var partenaire = {
      email: 'test@test.com',
      certified: 'En attente'
    };

    partenaire.$update = function(newPartenaire){
      partenaire = newPartenaire;
    };

    //when
    inject(function($controller){
      $controller('PartenairesCtrl', {
        $scope: scope
      });
    });
    scope.partenaires = [
      partenaire
    ];
    scope.certifier(scope.partenaires[0]);

    //then
    expect(scope.partenaires[0].certified).toBe('Certifié');

  });

  it('should be able to refuse a partner', function () {
    //given
    var scope = {};
    var partenaire = {
      email: 'test@test.com',
      certified: 'En attente'
    };

    partenaire.$update = function(newPartenaire){
      partenaire = newPartenaire;
    };

    //when
    inject(function($controller){
      $controller('PartenairesCtrl', {
        $scope: scope
      });
    });

    scope.partenaires = [
      partenaire
    ];
    scope.refuser(scope.partenaires[0]);

    //then
    expect(scope.partenaires[0].certified).toBe('Refusé');

  });
});
