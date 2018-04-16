'use strict';

describe('requestStatus filter', function() {
  beforeEach(module('impactApp'));

  describe('When the status is found', function() {
    it('should return the status label',
        inject(function(requestStatusFilter) {
      expect(requestStatusFilter('emise')).toBe('Émises');
    }));
  });

  describe('When the status is not found', function() {
    it('should return Label not found',
        inject(function(requestStatusFilter) {
      expect(requestStatusFilter('badLabel')).toBe('En cours');
    }));
  });
});
