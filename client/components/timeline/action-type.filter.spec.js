'use strict';

describe('action-type filter', function() {
  beforeEach(module('impactApp'));

  describe('When the action types exists', function() {
    var input = {
      action: 'creation'
    };

    it('should return the corresponding font awesome class',
        inject(function(actionTypeIconFilterFilter) {
      expect(actionTypeIconFilterFilter(input)).toBe('plus');
    }));
  });
});
