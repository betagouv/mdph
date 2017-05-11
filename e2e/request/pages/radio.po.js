/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var QuestionRadio = function() {
  var form = this.form = element(by.name('questionForm'));
  form.firstAnswer = element.all(by.css('.radio-answers')).first();
  form.next = form.element(by.id('btn-next'));
  form.returnToProfileLink = element(by.id('backtoprofile'));

  this.returnToProfile = function() {
    return form.returnToProfileLink.click();
  };

  this.answer = function() {
    form.firstAnswer.click();
    return form.next.click();
  };
};

module.exports = new QuestionRadio();
