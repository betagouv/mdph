'use strict';

import sinon from 'sinon';
import should from 'should';
import mongoose from 'mongoose';
import proxyquire from 'proxyquire';

describe('user.controller', function() {
  describe('create', function() {
    let fakeReq = {
      body: {
        name: 'toto',
        hashedPassword: '1234',
        email: 'toto@toto.com',
        mdph: '54'
      },
      headers: {
        host: 'fakeHost'
      }
    };

    let fakeRes = {
      json: function(par) {
        this.body = par;
        return this;
      }
    };

    let sendMailSpy = sinon.spy();

    let fakeToken = '1234';
    let jwtMock = function() {
      return fakeToken;
    };

    let fakeId = '5678';
    const UserController = proxyquire('./user.controller', {
      './user.model': {
        default: function(par) {
          par._id = fakeId;
          par.save = function(cb) {
            cb();
          };

          return par;
        }
      },
      '../send-mail/send-mail-actions': {
        sendConfirmationMail: sendMailSpy
      },
      jsonwebtoken: {
        sign: jwtMock
      }
    });

    it('should return the result with an access token and the id of the created user', function(done) {
      let result = UserController.create(fakeReq, fakeRes);
      should.exist(result);
      result.body.id.should.equal(fakeId);
      result.body.token.should.equal(fakeToken);

      sendMailSpy.calledOnce.should.equal(true);
      sendMailSpy.args[0][0].should.equal(fakeReq.body.email);
      sendMailSpy.args[0][1].should.containEql(`http://${fakeReq.headers.host}/mdph/${fakeReq.body.mdph}/confirmer_mail/${fakeId}`);
      done();
    });
  });
});
