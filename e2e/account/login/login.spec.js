'use strict';

var config = browser.params;

// var UserModel = require(config.serverConfig.root + '/server/api/user/user.model');
// console.log('TOTOOT', UserModel);

describe('Login View', function() {
  var page;

  var loadPage = function() {
    browser.get(config.baseUrl + '/login');
    page = require('./login.po');
  };

  // var testUser = {
  //   name: 'Test User',
  //   email: 'test@example.com',
  //   password: 'test'
  // };

  beforeEach(function(done) {
    // UserModel.removeAsync()
    //   .then(function() {
    //     return UserModel.createAsync(testUser);
    //   })
    //   .then(loadPage)
    //   .finally(function() {
    //     browser.wait(function() {
    //       //console.log('waiting for angular...');
    //       return browser.executeScript('return !!window.angular');
    //
    //     }, 5000).then(done);
    //
    //   });
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

  // describe('with local auth', function() {
  //
  //   it('should login a user and redirecting to "/"', function() {
  //     page.login(testUser);
  //
  //     var navbar = require('../../components/navbar/navbar.po');
  //
  //     expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/');
  //     expect(navbar.navbarAccountGreeting.getText()).toBe('Hello ' + testUser.name);
  //   });
  //
  //   it('should indicate login failures', function() {
  //     page.login({
  //       email: testUser.email,
  //       password: 'badPassword'
  //     });
  //
  //     expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/login');
  //
  //     var helpBlock = page.form.element(by.css('.form-group.has-error .help-block.ng-binding'));
  //     expect(helpBlock.getText()).toBe('This password is not correct.');
  //   });
  //
  // });
});
