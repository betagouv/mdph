'use strict';

/* global _ */

describe('Controller: pj', function () {

  // load the service's module
  beforeEach(module('impactApp'));
  var $scope;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('PieceJointeCtrl', {$scope: $scope});
  }));

  it('should render the right document list types', function() {
    expect($scope.documentTypes.length).toBe(6);
  });

});
