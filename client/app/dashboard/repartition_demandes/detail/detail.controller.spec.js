'use strict';

describe('Controller: demande.detail', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  it('should add a specific file', function () {
    //given
    var scope = {};
    var request = {
      steps: [{
        name: 'complementaire',
        state: 'pre_evaluation',
        files: [
              { name: 'certificatMedical', state: 'demande' },
              { name: 'carteIdentite', state: 'demande' }
        ]
      }]};
    var prestations = {};

    //when
    inject(function($controller){
      $controller('DetailDemandeCtrl', {
        $scope: scope,
        request: request,
        prestations: prestations
      });
    });

    scope.addRequestedFile({ name: 'carteVitale', state: 'demande' });

    //then
    expect(scope.request.steps[0].files.length).toEqual(3);
  });

  it('should remove a specific file', function () {
    //given
    var scope = {};
    var request = {
      steps: [{
        name: 'complementaire',
        state: 'pre_evaluation',
        files: [
              { name: 'certificatMedical', state: 'demande' },
              { name: 'carteIdentite', state: 'demande' }
        ]
      }]};
    var prestations = {};

    //when
    inject(function($controller){
      $controller('DetailDemandeCtrl', {
        $scope: scope,
        request: request,
        prestations: prestations
      });
    });

    scope.remove(scope.request.steps[0].files, 1);

    //then
    expect(scope.request.steps[0].files.length).toEqual(1);
  });

});
