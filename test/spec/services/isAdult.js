'use strict';

describe('Service: isAdult', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var _isAdult;
  beforeEach(inject(function (isAdult) {
    _isAdult = isAdult;
  }));

  it('should return true because the date is more than 18 years ago', function () {
    expect(_isAdult(new Date(1985,11,7))).toBe(true);
  });

  it('should return true because the date is more than 18 years ago', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    expect(_isAdult(date)).toBe(true);
  });

  it('should return false because the date is less than 18 years ago', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 17);
    expect(_isAdult(date)).toBe(false);
  });

  it('should return false because the date is less than 18 years ago', function () {
    expect(_isAdult(new Date(2014,1,1))).toBe(false);
  });
});
