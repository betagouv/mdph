'use strict';

describe('Filter: role', function () {

  // load the filter's module
  beforeEach(module('impactApp'));

  // initialize a new instance of the filter before each test
  var role;
  beforeEach(inject(function ($filter) {
    role = $filter('role');
  }));

  it('should return the prettystr version of the adminMdph role', function () {
    var text = 'adminMdph';
    expect(role(text)).toBe('Gestionnaire MDPH');
  });

});
