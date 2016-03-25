'use strict';

describe('Capitalize.filter', function() {

  beforeEach(function() {
    module('impactApp');

    inject(function(_$filter_) {
      this.$filter = _$filter_;
    });
  });

  describe('capitalize', function() {
    it('should capitalize first letter of a word, after a \' but not after an accent', function() {
      //given
      var text = 'type d\'hébergement';

      //when
      var result = this.$filter('capitalize')(text);

      //then
      expect(result).toBe('Type D\'Hébergement');
    });

    it('should capitalize after a \'-\'', function() {
      //given
      var text = 'courmont-nazaraly, naël';

      //when
      var result = this.$filter('capitalize')(text);

      //then
      expect(result).toBe('Courmont-Nazaraly, Naël');
    });
  });

  describe('capitalizeString', function() {
    it('should only capitalize the first letter of the string', function() {
      //given
      var text = 'type d\'hébergement';

      //when
      var result = this.$filter('capitalizeString')(text);

      //then
      expect(result).toBe('Type d\'hébergement');
    });
  });

});
