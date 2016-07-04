/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var RequestPage = function() {
  var path = require('path');

  this.listUploads = element.all(by.css('input[type="file"]'));
  this.cartestationnement = element(by.id('cartestationnement'));
  this.sendBtn = element(by.buttonText('Envoyer'));

  this.sendRequest = function() {
    var fileToUpload = '../../../../server/test/server/uploads/test.jpg';
    var absolutePath = path.resolve(__dirname, fileToUpload);

    this.listUploads.each(function(currentInput) {
      currentInput.sendKeys(absolutePath);
    });

    this.cartestationnement.click();
    this.sendBtn.click();
  };
};

module.exports = new RequestPage();
