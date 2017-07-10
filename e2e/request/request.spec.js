'use strict';

import {populate} from '../../test/utils/seed';
import pa11yRunner from '../../test/utils/pa11y';

var config = browser.params;

describe('fill a Request following after a login', function() {
  beforeAll(done => {
    populate(() => {
      done();
    });
  });

  var testUser = {
    email: 'user@test.com',
    password: 'hashedPassword'
  };

  var login = function(user) {
    browser.get(config.baseUrl + '/login');
    require('../login/login.po').login(user);
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
    login(testUser);
    browser
      .wait(function() {
          return browser.executeScript('return !!window.angular');
        }, 5000)
      .then(done);
  });

  it('should run pa11y on the profile view', (done) => {
    expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/profil/me');
    browser.getCurrentUrl().then(url => {
      pa11yRunner({url, onlyErrors: true}, (pa11yErrors) => {
        pa11yErrors.should.have.length(0);
        done();
      });
    });
  });

  it('should go to the identity form', function() {
    expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/profil/me');
    var pageProfile = require('./pages/emptyprofile.po');
    pageProfile.benefBtn.click();
  });

  it('should run pa11y on the identity form', (done) => {
    expect(browser.getCurrentUrl()).toContain('identite-beneficiaire');
    browser.getCurrentUrl().then(url => {
      pa11yRunner({url, onlyErrors: true}, (pa11yErrors) => {
        pa11yErrors.should.have.length(0);
        done();
      });
    });
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

  it('should return to profile when user clicks on the button', function() {
    expect(browser.getCurrentUrl()).toContain('/profil/');

    require('./pages/profile.po').modifyVieQuotidienne.click();

    expect(browser.getCurrentUrl()).toContain('vie_quotidienne');

    require('./pages/radio.po').returnToProfile();

    expect(browser.getCurrentUrl()).toContain('/profil/');
  });

  it('should return to the profile page and create the request', function() {
    expect(browser.getCurrentUrl()).toContain('/profil/');
    var profilePage = require('./pages/profile.po');
    expect(profilePage.beneficiaire.getAttribute('class')).toMatch('complete');
    expect(profilePage.vieQuotidienne.getAttribute('class')).toMatch('complete');
    expect(profilePage.completedList.count()).toEqual(2);
  });

  it('should add sample documents to the request', function() {
    expect(browser.getCurrentUrl()).toContain('/profil/');

    var profilePage = require('./pages/profile.po');
    expect(profilePage.documents.getAttribute('class')).toMatch('error');

    require('./pages/profile.po').modifyDocuments.click();
    require('./pages/documents.po').addDocuments();
    require('./pages/documents.po').returnToProfile();

    expect(browser.getCurrentUrl()).toContain('/profil/');
    expect(profilePage.documents.getAttribute('class')).toMatch('complete');
  });

  it('should send the request', function() {
    expect(browser.getCurrentUrl()).toContain('/profil/');
    require('./pages/profile.po').sendRequest.click();
  });

  it('should have the correct request status', function() {
    expect(browser.getCurrentUrl()).toContain('/profil/');
    expect(require('./pages/profile.po').statusTitle.getText()).toEqual("Votre demande est en cours de validation par votre MDPH");
  });

});
