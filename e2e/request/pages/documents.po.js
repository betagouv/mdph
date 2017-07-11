/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var config = browser.params;

var DocumentsPage = function() {
  var path = require('path');

  this.listUploads = element.all(by.css('input[type="file"]'));

  this.returnToProfile = () => element(by.id('backtoprofile')).click();

  this.addDocuments = () => {
    const absolutePath = path.join(config.serverConfig.root, '/test/assets/', 'test.jpg');
    this.listUploads.each(function(currentInput) {
      currentInput.sendKeys(absolutePath);
    });
  };
};

module.exports = new DocumentsPage();
