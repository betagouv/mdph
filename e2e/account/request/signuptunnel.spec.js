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
    require('./pages/radio.po').answer();
  };

  var answerOptional = function() {
    require('./pages/optional.po').answer();
  };

  var answerSub = function() {
    require('./pages/subanswer.po').answer();
  };

  beforeAll(function(done) {
    browser.manage().deleteAllCookies();
    signup(testUser);
    browser
      .wait(function() {
          return browser.executeScript('return !!window.angular');
        }, 5000)
      .then(done);
  });

  it('should fill the identity form', function() {
    expect(browser.getCurrentUrl()).toContain('identite-beneficiaire');
    require('./pages/beneficiaire.po').submit();
  });

  it('should fill the \'vie_quotidienne\' form', function() {
    expect(browser.getCurrentUrl()).toContain('vie_quotidienne');

    // situation
    answerRadio();
    answerSub();
    answerOptional();
    answerOptional();

    // vos_besoins
    answerOptional();
    answerOptional();
    answerRadio();
    answerOptional();

    // vos_attentes
    answerOptional();
    answerRadio();
    answerOptional();

    expect(browser.getCurrentUrl()).toContain('/profil/');
  });

  it('should return to the profile page and create the request', function() {
    expect(browser.getCurrentUrl()).toContain('/profil/');
    var profilePage = require('./pages/profile.po');
    expect(profilePage.beneficiaire.getAttribute('class')).toMatch('complete');
    expect(profilePage.vieQuotidienne.getAttribute('class')).toMatch('complete');
    expect(profilePage.completedList.count()).toEqual(2);

    profilePage.createRequest.click();
    expect(browser.getCurrentUrl()).toContain('/demande/');
  });
});
