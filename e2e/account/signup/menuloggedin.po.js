/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MenuLogout = function() {
  this.menu = element(by.css('.menu-dashboard'));
  this.user = this.menu.element(by.css('.user'));
  this.signout = this.menu.element(by.css('.sign-out'));
};

module.exports = new MenuLogout();
