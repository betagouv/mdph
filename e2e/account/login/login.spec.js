'use strict';

import should from 'should';
import {populate} from '../../../test/utils/seed';
import pa11yRunner from '../../../test/utils/pa11y';

var config = browser.params;

describe('Login View', function() {
  var page;

  beforeAll(done => {
    populate(() => {
      done();
    });
  });

  var loadPage = function() {
    browser.get(config.baseUrl + '/login');
    page = require('./login.po');
  };

  var testUser = {
    email: 'user@test.com',
    password: 'hashedPassword'
  };

  beforeEach(function(done) {
    loadPage();
    browser.wait(function() {
        return browser.executeScript('return !!window.angular');
    }, 5000).then(done);
  });

  it('should run pa11y', (done) => {
    browser.getCurrentUrl().then(url => {
      pa11yRunner({url, onlyErrors: true}, (err) => {
        err.should.be.empty();
        done();
      });
    });
  });

  it('should include login form with correct inputs and submit button', function() {
    expect(page.form.email.getAttribute('type')).toBe('email');
    expect(page.form.email.getAttribute('name')).toBe('email');
    expect(page.form.password.getAttribute('type')).toBe('password');
    expect(page.form.password.getAttribute('name')).toBe('password');
    expect(page.form.submit.getAttribute('type')).toBe('submit');
    expect(page.form.submit.getAttribute('value')).toBe('Connectez-vous');
  });

  describe('with local auth', function() {

    it('should login a user and redirecting to "/"', function() {
      page.login(testUser);
      expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/profil/me');
    });

    it('should indicate login failures', function() {
      page.login({
        email: testUser.email,
        password: 'badPassword'
      });

      expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/login');
    });

  });
});
