'use strict';

describe('Controller: demande.detail', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  it('should add a specific file', function () {
    //given
    var scope = {};
    var request = {};
    var prestations = {};

    //when
    inject(function($controller){
      $controller('DetailDemandeCtrl', {
        $scope: scope,
        request: request,
        prestations: prestations
      });
    });
    scope.requestedFiles = [
            { name: 'certificatMedical', state: 'demande' },
            { name: 'carteIdentite', state: 'demande' }
          ];
    scope.addRequestedFile({ name: 'carteVitale', state: 'demande' });

    //then
    expect(scope.requestedFiles.length).toEqual(3);
  });

  it('should remove a specific file', function () {
    //given
    var scope = {};
    var request = {};
    var prestations = {};

    //when
    inject(function($controller){
      $controller('DetailDemandeCtrl', {
        $scope: scope,
        request: request,
        prestations: prestations
      });
    });
    scope.requestedFiles = [
            { name: 'certificatMedical', state: 'demande' },
            { name: 'carteIdentite', state: 'demande' }
          ];
    scope.removeRequestedFile(1);

    //then
    expect(scope.requestedFiles.length).toEqual(1);
  });

});
