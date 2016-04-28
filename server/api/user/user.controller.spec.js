'use strict';

import sinon from 'sinon';
import should from 'should';
import mongoose from 'mongoose';
import proxyquire from 'proxyquire';
import Promise from 'bluebird';

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
      },

      status: function(par) {
        this.statusCode = par;
        return this;
      }
    };

    let sendMailSpy = sinon.spy();

    let fakeId = '1234';
    let fakeToken = '5678';
    let saveSpy = sinon.spy();
    const UserController = proxyquire('./user.controller', {
      './user.model': {
        default: function(par) {
          par._id = fakeId;
          par.save = function() {
            return new Promise((resolve) => {
              saveSpy(this);
              resolve();
            });
          };

          return par;
        }
      },
      '../send-mail/send-mail-actions': {
        sendConfirmationMail: sendMailSpy
      },
      jsonwebtoken: {
        sign: function() {
          return fakeToken;
        }
      }
    });

    beforeEach(function() {
      saveSpy.reset();
      sendMailSpy.reset();
    });

    describe('create an user', function() {
      it('should create an user and return an access token and the id of the created user', function(done) {
        UserController
          .create(fakeReq, fakeRes)
          .then(result => {
            should.exist(result);

            result.statusCode.should.equal(201);

            result.body.id.should.equal(fakeId);
            result.body.token.should.equal(fakeToken);

            saveSpy.calledOnce.should.equal(true);
            saveSpy.args[0][0]._id.should.equal(fakeId);
            saveSpy.args[0][0].email.should.equal(fakeReq.body.email);
            saveSpy.args[0][0].role.should.equal('user');

            sendMailSpy.calledOnce.should.equal(true);
            sendMailSpy.args[0][0].should.equal(fakeReq.body.email);
            sendMailSpy.args[0][1].should.containEql(`http://${fakeReq.headers.host}/mdph/${fakeReq.body.mdph}/confirmer_mail/${fakeId}`);
            done();
          });
      });
    });

    describe('createAgent', function() {
      it('should create an agent and return an access token and the id of the created agent', function(done) {
        UserController
          .createAgent(fakeReq, fakeRes)
          .then(result => {
            should.exist(result);

            result.statusCode.should.equal(201);

            result.body.id.should.equal(fakeId);
            result.body.token.should.equal(fakeToken);

            saveSpy.calledOnce.should.equal(true);
            saveSpy.args[0][0]._id.should.equal(fakeId);
            saveSpy.args[0][0].email.should.equal(fakeReq.body.email);
            saveSpy.args[0][0].role.should.equal('agent');

            sendMailSpy.calledOnce.should.equal(true);
            sendMailSpy.args[0][0].should.equal(fakeReq.body.email);
            sendMailSpy.args[0][1].should.containEql(`http://${fakeReq.headers.host}/mdph/${fakeReq.body.mdph}/confirmer_mail/${fakeId}`);
            done();
          });
      });
    });
  });
});
