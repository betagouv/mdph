'use strict';

import sinon from 'sinon';
import should from 'should';
import proxyquire from 'proxyquire';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import blackhole from 'stream-blackhole';

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
      },
      user: {
        _id: mongoose.Types.ObjectId()
      },
      log: {
        error: blackhole,
        info: blackhole
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
    let fakeIdProfile = '1337';
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
      '../profile/profile.model': {
        default: {
          create() {
            return Promise.resolve({_id: fakeIdProfile});
          }
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

    describe('create a user', function() {
      it('should return an access token and the id of the created user', function(done) {
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
            saveSpy.args[0][0].unconfirmed.should.equal(true);

            sendMailSpy.calledOnce.should.equal(true);
            sendMailSpy.args[0][0].should.equal(fakeReq.body.email);
            sendMailSpy.args[0][1].should.containEql(`http://${fakeReq.headers.host}/mdph/${fakeReq.body.mdph}/confirmer_mail/${fakeId}`);
            done();
          });
      });
    });

    describe('createAgent', function() {
      it('should return an access token and the id of the created agent', function(done) {
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
            saveSpy.args[0][0].role.should.equal('adminMdph');
            saveSpy.args[0][0].unconfirmed.should.equal(false);

            sendMailSpy.calledOnce.should.equal(false);
            done();
          });
      });
    });
  });
});
