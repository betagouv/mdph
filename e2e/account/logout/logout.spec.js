'use strict';

import {populate} from '../../../test/utils/seed';

var config = browser.params;

describe('Logout View', function() {
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

  beforeEach(function(done) {
    login(testUser);
    browser.wait(function() {
      return browser.executeScript('return !!window.angular');
    }, 5000).then(done);
  });

  describe('with local auth', function() {

    it('should logout a user and redirecting to "/"', function() {
      expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/profil/me');

      browser.get(config.baseUrl + '/logout');

      var LoggedOut = require('./loggedout.po');

      expect(browser.getCurrentUrl()).toBe(config.baseUrl);
      expect(LoggedOut.login.isDisplayed()).toBe(true);
    });

  });
});
