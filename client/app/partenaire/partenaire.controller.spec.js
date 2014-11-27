'use strict';

describe('Controller: partenaire', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  it('should render initial data', function () {
    //given
    var scope = {};

    //when
    inject(function($controller){
      $controller('PartenaireCtrl', {
        $scope: scope
      });
    });

    scope.request = {
      shortId: 'AAAAA'
    };
    scope.enterShortId(scope.request);

    //then
    expect(scope.request.shortId).toEqual('AAAAA');

  });

});
