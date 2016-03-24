'use strict';

describe('Service: estAdulte', function() {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var estAdulte;
  beforeEach(inject(function(_estAdulte_) {
    estAdulte = _estAdulte_;
  }));

  it('should return true because the date is more than 20 years ago', function() {
    var dateNaissance = new Date(1973, 11, 7);
    expect(estAdulte(dateNaissance)).toBe(true);
  });

  it('should return true because the date is more than 20 years ago', function() {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 20);
    var dateNaissance = date;
    expect(estAdulte(dateNaissance)).toBe(true);
  });

  it('should return false because the date is less than 20 years ago', function() {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 19);
    var dateNaissance = date;
    expect(estAdulte(dateNaissance)).toBe(false);
  });

  it('should return false because the date is less than 20 years ago', function() {
    var dateNaissance = new Date(2014, 1, 1);
    expect(estAdulte(dateNaissance)).toBe(false);
  });

  it('should return true by default', function() {
    expect(estAdulte(null)).toBe(true);
  });

});

describe('Service: estMineur', function() {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var estMineur;
  beforeEach(inject(function(_estMineur_) {
    estMineur = _estMineur_;
  }));

  it('should return false because the date is more than 20 years ago', function() {
    var dateNaissance = new Date(1973, 11, 7);
    expect(estMineur(dateNaissance)).toBe(false);
  });

  it('should return false because the date is more than 20 years ago', function() {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 20);
    var dateNaissance = date;
    expect(estMineur(dateNaissance)).toBe(false);
  });

  it('should return true because the date is less than 20 years ago', function() {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 19);
    var dateNaissance = date;
    expect(estMineur(dateNaissance)).toBe(true);
  });

  it('should return true because the date is less than 20 years ago', function() {
    var dateNaissance = new Date(2014, 1, 1);
    expect(estMineur(dateNaissance)).toBe(true);
  });

  it('should return false by default', function() {
    expect(estMineur(null)).toBe(false);
  });

});
