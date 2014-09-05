'use strict';

describe('Service: getDroits', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var getDroits;
  beforeEach(inject(function (_getDroits_) {
    getDroits = _getDroits_;
  }));

  it('should do something', function () {
    expect(!!getDroits).toBe(true);
  });

});
