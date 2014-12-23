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
    scope.files = [
            { name: 'certificatMedical', state: 'demande' },
            { name: 'carteIdentite', state: 'demande' }
          ];
    scope.addFile({ name: 'carteVitale', state: 'demande' });

    //then
    expect(scope.files.length).toEqual(3);
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
    scope.files = [
            { name: 'certificatMedical', state: 'demande' },
            { name: 'carteIdentite', state: 'demande' }
          ];
    scope.removeFile(1);

    //then
    expect(scope.files.length).toEqual(1);
  });

});
