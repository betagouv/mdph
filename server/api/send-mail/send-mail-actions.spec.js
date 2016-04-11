'use strict';

var should = require('should');
var sinon = require('sinon');
import proxyquire from 'proxyquire';

const Mailer = require('./send-mail.controller');

describe('Send Mail Actions', function() {
  describe('sendMailNotificationAgent', function() {
    let sendMailSpy = sinon.spy();

    const SendMailAction = proxyquire('./send-mail-actions', {
      './send-mail.controller': {
        sendMail: sendMailSpy
      }
    });

    let fakeRequest = {
      shortId: '1234'
    };
    let fakeEmail = 'toto@toto.com';

    it('should send the correct email to the correct adress', function(done) {
      var promise = SendMailAction.sendMailNotificationAgent(fakeRequest, fakeEmail);
      promise.then(function() {
        sendMailSpy.calledOnce.should.equal(true);
        sendMailSpy.args[0][0].should.equal(fakeEmail);
        sendMailSpy.args[0][1].should.equal('Vous avez reçu une nouvelle demande');
        sendMailSpy.args[0][2].should.containEql('Référence de la demande: 1234');
        done();
      });

    });

  });

  describe.only('sendMailReceivedTransmission', function() {
    let sendMailSpy = sinon.spy();

    const PdfMakerStub = sinon.stub().resolves('lol');

    const SendMailAction = proxyquire('./send-mail-actions', {
      './send-mail.controller': {
        sendMail: sendMailSpy
      },
      '../../components/pdf-maker': {
        default: PdfMakerStub
      }
    });

    let fakeOptions = {
      request: {
        shortId: '1234'
      },
      fakeEmail: 'toto@toto.com'
    };

    it('should send the correct email to the correct adress', function(done) {
      var promise = SendMailAction.sendMailReceivedTransmission(fakeOptions);
      promise.then(function() {
        sendMailSpy.calledOnce.should.equal(true);
        sendMailSpy.args[0][0].should.equal(fakeOptions.fakeEmail);
        sendMailSpy.args[0][1].should.equal('Votre demande à bien été transmise');
        sendMailSpy.args[0][2].should.containEql('Merci d\'avoir passé votre demande avec notre service. <br> Votre demande à été transmise à votre MDPH. Vous pouvez trouver ci-joint un récapitulatif de votre demande au format PDF.');
        done();
      });

    });

  });

  describe('sendConfirmationMail', function() {
    let sendMailSpy = sinon.spy();

    const SendMailAction = proxyquire('./send-mail-actions', {
      './send-mail.controller': {
        sendMail: sendMailSpy
      }
    });

    let fakeURL = 'www.toto.com';
    let fakeEmail = 'toto@toto.com';

    it('should send the correct email to the correct adress', function(done) {
      var promise = SendMailAction.sendConfirmationMail(fakeEmail, fakeURL);
      promise.then(function() {
        sendMailSpy.calledOnce.should.equal(true);
        sendMailSpy.args[0][0].should.equal(fakeEmail);
        sendMailSpy.args[0][1].should.equal('Veuillez confirmer votre adresse e-mail');
        sendMailSpy.args[0][2].should.containEql(fakeURL);
        done();
      });

    });

  });

  describe('sendMailCompletude', function() {
    let sendMailSpy = sinon.spy();

    const SendMailAction = proxyquire('./send-mail-actions', {
      './send-mail.controller': {
        sendMail: sendMailSpy
      }
    });

    let fakeRequest = {
      shortId: '1234',
      mdph: '11',
      user: {
        email: 'toto@toto.com'
      }
    };

    let fakeOptions = {
      url: 'www.toto.com'
    };

    it('should send the correct email to the correct adress', function(done) {
      var promise = SendMailAction.sendMailCompletude(fakeRequest, fakeOptions);
      promise.then(function() {
        sendMailSpy.calledOnce.should.equal(true);
        sendMailSpy.args[0][0].should.equal(fakeRequest.user.email);
        sendMailSpy.args[0][1].should.equal('Accusé de réception de votre MDPH');
        sendMailSpy.args[0][2].should.containEql(fakeRequest.mdph);
        sendMailSpy.args[0][2].should.containEql(fakeOptions.url + '</p>');
        done();
      });

    });

  });
});
