/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var ProfilePage = function() {
  this.benefBtn = element(by.css('#beneficiaire .btn'));
};

module.exports = new ProfilePage();
