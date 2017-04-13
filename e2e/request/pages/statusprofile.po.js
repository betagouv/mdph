/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var statusPage = function() {
  this.doneList = element.all(by.css('li.done'));
  this.activeList = element.all(by.css('li.active'));
};

module.exports = new statusPage();
