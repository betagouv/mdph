'use strict';

describe('Service: isAdult', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var _isAdult;
  beforeEach(inject(function (isAdult) {
    _isAdult = isAdult;
  }));

  it('should return true because the date is more than 20 years ago', function () {
    var contexte = {answers: {dateNaissance: {value: new Date(1983,11,7)}}};
    expect(_isAdult(contexte)).toBe(true);
  });

  it('should return true because the date is more than 20 years ago', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 20);
    var contexte = {answers: {dateNaissance: {value: date}}};
    expect(_isAdult(contexte)).toBe(true);
  });

  it('should return false because the date is less than 20 years ago', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 19);
    var contexte = {answers: {dateNaissance: {value: date}}};
    expect(_isAdult(contexte)).toBe(false);
  });

  it('should return false because the date is less than 20 years ago', function () {
    var contexte = {answers: {dateNaissance: {value: new Date(2014,1,1)}}};
    expect(_isAdult(contexte)).toBe(false);
  });
});
