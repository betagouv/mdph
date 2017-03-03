'use strict';

import proxyquire from 'proxyquire';
import sinon from 'sinon';

const testConfig = {
  smtpUser: 'test_user',
  smtpPass: 'test_pass',
  smtpHost: 'test.host',
  smtpPort: 'test_port',
  mailFrom: 'test@mail.from'
};

describe('MailSender', () => {
  describe('sendMail', () => {
    let mailSender;
    const sendMailSpy = sinon.spy();

    before(done => {

      const MailSender = proxyquire('./mail-sender', {
        nodemailer: {
          createTransport() {
            return {
              sendMail: sendMailSpy
            };
          }
        }
      });

      mailSender = new MailSender(testConfig);
      done();
    });

    it('calls the sendMail function on the transporter when we call sendContent', (done) => {
      const to = 'test@test.com';

      mailSender.sendContent(
        to,
        'Mail title',
        'Mail body'
      );

      sendMailSpy.calledOnce.should.equal(true);
      sendMailSpy.args[0][0].from.should.equal(testConfig.mailFrom);
      sendMailSpy.args[0][0].to.should.equal(to);

      done();
    });
  });

  describe('transporter', () => {
    let mailSender;
    const createTransportSpy = sinon.spy();

    before(done => {
      const MailSender = proxyquire('./mail-sender', {
        nodemailer: {
          createTransport: createTransportSpy
        }
      });

      mailSender = new MailSender(testConfig);
      done();
    });

    it('configures the transporter correctly', (done) => {
      createTransportSpy.calledOnce.should.equal(true);

      const computedSmtpOptions = createTransportSpy.args[0][0].options;

      computedSmtpOptions.port.should.equal('test_port');
      computedSmtpOptions.host.should.equal('test.host');
      computedSmtpOptions.auth.user.should.equal('test_user');
      computedSmtpOptions.auth.pass.should.equal('test_pass');

      done();
    });
  });
});
