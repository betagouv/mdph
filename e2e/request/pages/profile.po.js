/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var ProfilePage = function() {
  this.beneficiaire = element(by.css('#beneficiaire .profile-category'));
  this.vieQuotidienne = element(by.css('#vieQuotidienne .profile-category'));
  this.modifyVieQuotidienneButton = this.vieQuotidienne.element(by.buttonText('Modifier'));
  this.completedList = element.all(by.css('.profile-category.complete'));

  this.createRequest = element(by.buttonText('Finaliser la demande'));

  this.modifyVieQuotidienne = () => {
    return this.modifyVieQuotidienneButton.click();
  }
};

module.exports = new ProfilePage();
