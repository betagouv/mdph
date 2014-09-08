'use strict';

describe('Filter: role', function () {

  // load the filter's module
  beforeEach(module('impactApp'));

  // initialize a new instance of the filter before each test
  var role;
  beforeEach(inject(function ($filter) {
    role = $filter('role');
  }));

  it('should return the input prefixed with "role filter:"', function () {
    var text = 'angularjs';
    expect(role(text)).toBe('role filter: ' + text);
  });

});
