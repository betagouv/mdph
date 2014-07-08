'use strict';

describe('Service: DateService', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var DateService;
  beforeEach(inject(function (_DateService_) {
    DateService = _DateService_;
  }));

  it('should do something', function () {
    expect(!!DateService).toBe(true);
  });

});
