'use strict';

import {populate} from '../../../server/test/utils/seed';

var config = browser.params;

// var UserModel = require(config.serverConfig.root + '/server/api/user/user.model').default;

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
    done();
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

    afterEach(function() {
      browser.manage().logs().get('browser')
        .then(function(browserLog) {
          console.log('LOG', browserLog);
        });
    });

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
