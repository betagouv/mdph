'use strict';

describe('Controller: pj', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  it('should render initial data', function () {
    //given
    var scope = {};
    var request = [{
          shortId: 'AAAA'
        }];

    //when
    inject(function($controller){
      $controller('PieceJointeCtrl', {
        $scope: scope,
        request: request
      });
    });

    //then
    expect(scope.request.length).toBe(1);

  });

});
