'use strict';

describe('Filter: role', function() {

  var $filter;

  beforeEach(function() {
    module('impactApp');

    inject(function(_$filter_) {
      $filter = _$filter_;
    });
  });

  describe('admin', function() {
    it('should return Administrateur', function() {
      //given
      var text = 'admin';

      //when
      var result = $filter('role')(text);

      //then
      expect(result).toBe('Administrateur');
    });
  });

  describe('adminMdph', function() {
    it('should return Gestionnaire MDPH', function() {
      //given
      var text = 'adminMdph';

      //when
      var result = $filter('role')(text);

      //then
      expect(result).toBe('Gestionnaire MDPH');
    });
  });

  describe('user', function() {
    it('should return Utilisateur', function() {
      //given
      var text = 'user';

      //when
      var result = $filter('role')(text);

      //then
      expect(result).toBe('Utilisateur');
    });
  });

  describe('default', function() {
    it('should return an empty string', function() {
      //given
      var text = 'FakeRole';

      //when
      var result = $filter('role')(text);

      //then
      expect(result).toBe('');
    });
  });

});
