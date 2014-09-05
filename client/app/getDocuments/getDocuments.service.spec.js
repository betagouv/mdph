'use strict';

describe('Service: getDocuments', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var getDocuments;
  beforeEach(inject(function (_getDocuments_) {
    getDocuments = _getDocuments_;
  }));

  it('should do something', function () {
    expect(!!getDocuments).toBe(true);
  });

});
