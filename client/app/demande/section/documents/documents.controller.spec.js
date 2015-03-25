'use strict';

describe('Controller: documents', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  it('should render initial data', function () {
    //given
    var scope = {};
    var request = {
      shortId: 'AAAA',
      documents : [{type: 'carteIdentite'}]
    };

    //when
    inject(function($controller){
      $controller('DocumentsCtrl', {
        $scope: scope,
        request: request,
        section: {},
        documentTypes: [{id: 'carteIdentite'}]
      });
    });

    //then
    expect(scope.filesVM.carteIdentite[0].type).toBe('carteIdentite');
  });

});
