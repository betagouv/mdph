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
  form.birthday = form.element(by.id('date-de-naissance'));
  form.address = form.element(by.id('address'));
  form.code_postal = form.element(by.id('code_postal'));
  form.localite = form.element(by.id('localite'));
  form.email = form.element(by.id('email'));
  form.cpam = form.element(by.id('assurance_cpam'));
  form.numeroSecu = form.element(by.id('numero_secu'));
  form.submit = form.element(by.id('submit-benef'));


  this.submit = function() {
    form.name.sendKeys('test');
    form.surname.sendKeys('test');
    form.radio_sexe.click();
    form.radio_nat.click();
    form.birthday.sendKeys('01011900');
    form.address.sendKeys('1, rue du test');
    form.code_postal.sendKeys('75001');
    form.localite.sendKeys('Paris');
    form.cpam.click();
    form.numeroSecu.sendKeys('');
    form.numeroSecu.sendKeys('168089200203980');

    return form.submit.click();
  };
};

module.exports = new Beneficiaire();
