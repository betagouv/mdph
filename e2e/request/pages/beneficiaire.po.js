/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var Beneficiaire = function() {
  var form = this.form = element(by.id('profile-identites'));
  form.name = form.element(by.id('nom'));
  form.surname = form.element(by.id('prenom'));
  form.radio_sexe = form.element(by.id('sexe-m'));
  form.radio_nat = form.element(by.id('nationalite_francaise'));
  form.bday = form.element(by.id('date-de-naissance'));
  form.address = form.element(by.id('address'));
  form.code_postal = form.element(by.id('code_postal'));
  form.localite = form.element(by.id('localite'));
  form.cpam = form.element(by.id('assurance_cpam'));
  form.numeroSecu = form.element(by.id('numero_secu'));
  form.submit = form.element(by.id('submit-benef'));

  this.submit = function() {
    form.name.sendKeys('test');
    form.surname.sendKeys('test');
    form.bday.sendKeys('01011900');
    form.address.sendKeys('1, rue du test');
    form.code_postal.sendKeys('75001');
    form.localite.sendKeys('Paris');
    form.numeroSecu.sendKeys('168089200203980');

    form.cpam.click();
    form.radio_sexe.click();
    form.radio_nat.click();

    return form.submit.click();
  };
};

module.exports = new Beneficiaire();
