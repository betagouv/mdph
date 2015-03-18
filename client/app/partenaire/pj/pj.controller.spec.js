'use strict';

describe('Controller: pj', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  it('should render initial data', function () {
    //given
    var scope = {};
    var documents =  [{type: 'carteIdentite'}];
    var request = {
          shortId: 'AAAA',
          documents : documents
        };

    //when
    inject(function($controller){
      $controller('PieceJointeCtrl', {
        $scope: scope,
        request: request,
        mdph: {}
      });
    });

    //then
    expect(scope.documents).toBe(documents);
  });

});
