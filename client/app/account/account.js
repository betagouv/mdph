'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('forgotten_password', {
        url: '/mot_de_passe_oublie',
        templateUrl: 'app/account/forgotten_password/forgotten_password.html',
        controller: 'ForgottenPasswordCtrl'
      })
      .state('envoi_confirmation', {
        url: '/envoi_confirmation',
        templateUrl: 'app/account/confirmer_mail/confirmation.html'
      })
      .state('confirmer_mail', {
        url: '/confirmer_mail/:userId/:newMailToken',
        templateUrl: 'app/account/confirmer_mail/confirmer_mail.html',
        controller: 'ConfirmerMailCtrl'
      })
      .state('forgotten_password.confirmation', {
        url: '/confirmation',
        templateUrl: 'app/account/forgotten_password/confirmation.html'
      })
      .state('reset_password', {
        url: '/nouveau_mot_de_passe/:userId/:newPasswordToken',
        templateUrl: 'app/account/reset_password/reset_password.html',
        controller: 'ResetPasswordCtrl'
      });
  });
