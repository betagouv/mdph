'use strict';

describe('Filter: role', function () {

  var $filter;

  beforeEach(function () {
    module('impactApp');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });


  it('should return the prettystr version of the adminMdph role', function () {
    var text = 'adminMdph';

    var result = $filter('role')(text);

    expect(result).toBe('Gestionnaire MDPH');
  });

});
