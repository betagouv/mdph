'use strict';

var config = browser.params;
var User = require(config.serverConfig.root + '/server/api/user/user.model').default;

describe('Signup View', function() {
  var page;

  var loadPage = function() {
    browser.manage().deleteAllCookies();
    browser.get(config.baseUrl + '/signup');
    page = require('./signup.po');
  };

  var testUser = {
    email: 'test@example.com',
    password: 'test1234'
  };

  var incorrectUser = {
    email: 'short@password.com',
    password: 'test'
  };

  beforeEach(function(done) {
    loadPage();
    browser.wait(function() {
        return browser.executeScript('return !!window.angular');
    }, 5000).then(done);
  });

  it('should include signup form with correct inputs and submit button', function() {
    expect(page.form.email.getAttribute('type')).toBe('email');
    expect(page.form.email.getAttribute('name')).toBe('email');
    expect(page.form.password.getAttribute('type')).toBe('password');
    expect(page.form.password.getAttribute('name')).toBe('password');
    expect(page.form.submit.getAttribute('type')).toBe('submit');
    expect(page.form.submit.getText()).toBe('Inscrivez-vous');
  });

  describe('with local auth', function() {

    beforeAll(function(done) {
      User.remove().then(done);
    });

    it('should signup a new user, log them in, and redirecting to "/"', function() {
      page.signup(testUser);

      var menu = require('./menuloggedin.po');

      expect(browser.getCurrentUrl()).toContain('identite-beneficiaire');
      expect(menu.user.getText()).toBe('Mon compte');
    });

    it('should indicate duplicate email', function() {
      page.signup(testUser);

      expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/signup');
      expect(page.form.email.getAttribute('class')).toContain('ng-invalid-mongoose');

      var helpBlock = page.form.element(by.css('.help-block'));
      expect(helpBlock.getText()).toBe('Cette adresse est déjà utilisée.');
    });

    it('should indicate incorrect password', function() {
      page.signup(incorrectUser);

      expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/signup');
      expect(page.form.password.getAttribute('class')).toContain('ng-invalid-minlength');

      var helpBlock = page.form.element(by.css('.help-block'));
      expect(helpBlock.getText()).toBe('Le mot de passe doit être au moins de 8 caractères.');
    });

  });
});
