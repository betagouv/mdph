'use strict';

describe('Controller: pj', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  it('should render initial data', function () {
    //given
    var scope = {};
    var files =  ['rox', 'anne'];
    var request = {
          shortId: 'AAAA',
          steps: [
            {name: 'complementaire', files: files}
          ]
        };

    //when
    inject(function($controller){
      $controller('PieceJointeCtrl', {
        $scope: scope,
        request: request
      });
    });

    //then
    expect(scope.files).toBe(files);

  });

});
