'use strict';

describe('RecapitulatifCtrl', function() {
  var $controller;
  var controller;
  var scope = {};
  var fakeCookies = {
    get() {}
  };
  var fakeRequest = {
    shortId: 'id123456',
    formAnswers: {
      identites: {
        beneficiaire: {
          nom: 'Quelen',
          prenom: 'Roman',
        }
      }
    }
  };

  beforeEach(function() {
    module('impactApp');
  });

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('Pdf name', function() {
    beforeEach(function() {
      spyOn(fakeCookies, 'get');
      controller = $controller('RecapitulatifCtrl', {$scope: scope, $cookies: fakeCookies, request: fakeRequest});
    });

    it('should return the correct pdf file name', function() {
      var result = scope.pdfName;
      expect(fakeCookies.get).toHaveBeenCalled();
      expect(result).toBe('quelen_roman_id123456.pdf');
    });
  });

});
