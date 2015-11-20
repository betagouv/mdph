'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        data: {
          title: 'Connexion'
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl',
        data: {
          title: 'Inscription'
        }
      })
      .state('forgotten_password', {
        url: '/mot_de_passe_oublie',
        templateUrl: 'app/account/forgotten_password/forgotten_password.html',
        controller: 'ForgottenPasswordCtrl',
        data: {
          title: 'Mot de passe oublié'
        }
      })
      .state('envoi_confirmation', {
        url: '/envoi_confirmation',
        templateUrl: 'app/account/confirmer_mail/confirmation.html',
        data: {
          title: 'Confirmation de votre adresse mail'
        }
      })
      .state('confirmer_mail', {
        url: '/confirmer_mail/:userId/:newMailToken',
        templateUrl: 'app/account/confirmer_mail/confirmer_mail.html',
        controller: 'ConfirmerMailCtrl',
        data: {
          title: 'Confirmation de votre adresse mail'
        }
      })
      .state('forgotten_password.confirmation', {
        url: '/confirmation',
        templateUrl: 'app/account/forgotten_password/confirmation.html',
        data: {
          title: 'Mot de passe oublié'
        }
      })
      .state('reset_password', {
        url: '/nouveau_mot_de_passe/:userId/:newPasswordToken',
        templateUrl: 'app/account/reset_password/reset_password.html',
        controller: 'ResetPasswordCtrl',
        data: {
          title: 'Mot de passe oublié'
        }
      })
      .state('resend_confirmation', {
        url: '/renvoyer_confirmation/:userId',
        templateUrl: 'app/account/resend_confirmation/resend_confirmation.html',
        controller: 'ResendConfirmationCtrl',
        data: {
          title: 'Confirmation de votre adresse mail'
        }
      })
      .state('resend_confirmation_ok', {
        url: '/renvoyer_confirmation_ok',
        templateUrl: 'app/account/resend_confirmation/ok.html',
        controller: function() {}
      })
      .state('resend_confirmation_error', {
        url: '/renvoyer_confirmation_erreur',
        templateUrl: 'app/account/resend_confirmation/error.html',
        controller: function() {}
      });
  });
