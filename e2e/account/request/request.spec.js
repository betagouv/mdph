'use strict';

import {populate} from '../../../server/test/utils/seed';

var config = browser.params;

describe('fill a Request following a signup', function() {
  beforeAll(done => {
    populate(() => {
      done();
    });
  });

  var testUser = {
    email: 'new@user.com',
    password: 'hashedPassword'
  };

  var signup = function(user) {
    browser.get(config.baseUrl + '/signup');
    require('../signup/signup.po').signup(user);
  };

  var answerRadio = function() {
    var QuestionPage = require('./radio.po');
    QuestionPage.answer();
  };

  var answerOptional = function() {
    var QuestionPage = require('./optional.po');
    QuestionPage.answer();
  };

  var answerSub = function() {
    var QuestionPage = require('./subanswer.po');
    QuestionPage.answer();
  };

  beforeEach(function(done) {
    signup(testUser);
    browser
      .wait(function() {
          return browser.executeScript('return !!window.angular');
        }, 5000)
      .then(done);
  });

  afterEach(function() {
    browser
      .manage()
      .logs()
      .get('browser')
      .then(function(browserLog) {
        console.log('LOG', browserLog);
      });
  });

  it('should fill a request and send it to the MDPH', function() {
    expect(browser.getCurrentUrl()).toContain('identite-beneficiaire');
    var beneficiaire = require('./beneficiaire.po');
    beneficiaire.submit();

    answerRadio();
    answerSub();
    answerOptional();
    answerOptional();
    answerOptional();
    answerOptional();
    answerRadio();
    answerOptional();
    answerOptional();
    answerRadio();
    answerOptional();

    expect(browser.getCurrentUrl()).toContain('/profil/');
  });
});
