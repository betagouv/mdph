'use strict';

import should from 'should';
import {startServer} from '../../test/utils/server';
import * as controller from './user.controller';
import User from '../user/user.model';

describe('User Integration', function() {
  let api;
  let token;
  let tokenAdmin;
  let tokenAdminMdph;
  let testUser;
  let server;
  let testMdph;

  before(done => {
    startServer(result => {
      server = result.server;
      api = result.api;
      token = result.token;
      tokenAdmin = result.tokenAdmin;
      tokenAdminMdph = result.tokenAdminMdph;
      testUser = result.fakeUser;
      testMdph = result.testMdph;
      done();
    });
  });

  describe('GET', function() {
    describe('Get list users of a MDPH', function() {
      it('should respond 200 and return the list', done => {
        let gettedUsers;

        api
          .get('/api/users/')
          .query({
            access_token: tokenAdminMdph
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            gettedUsers = res.body;
            gettedUsers.should.have.length(1);
            gettedUsers[0].email.should.equal('admin-mdph@test.com');
            done();
          });
      });
    });

    describe('Get a specified user', function() {
      it('should respond with 200 and return the specified user', done => {
        let gettedUser;

        api
          .get(`/api/users/${testUser._id}`)
          .query({
            access_token: tokenAdminMdph
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            gettedUser = res.body;
            gettedUser.email.should.equal('user@test.com');
            done();
          });
      });
    });

    describe('Get my info', function() {
      it('should respond 200 and return my info', done => {
        let gettedUser;

        api
          .get('/api/users/me')
          .query({
            access_token: token
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            gettedUser = res.body;
            gettedUser.email.should.equal('user@test.com');
            done();
          });
      });
    });

    describe('Search a user by its email', function() {
      it('should respond 200 and return the specified user', done => {
        let gettedUser;

        api
          .get('/api/users/search')
          .query({
            access_token: token,
            email: 'user@test.com'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            gettedUser = res.body;
            gettedUser.email.should.equal('user@test.com');
            done();
          });
      });
    });
  });

  describe('POST', function() {
    describe('create a regular User', function() {
      it('should respond 201 and return the created user', done => {
        let result;

        api
          .post('/api/users/')
          .query({
            access_token: token
          })
          .send({
            provider: 'local',
            name: 'Created User',
            email: 'created@user.com',
            password: 'hashedPassword',
            mdph: 'test'
          })
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            result = res.body;
            result.should.have.property('token');
            result.should.have.property('id');
            result.should.have.property('profile');
            done();
          });
      });
    });

    describe('create an Agent', function() {
      it('should respond 201 and return the created agent', done => {
        let result;

        api
          .post('/api/users/agent/')
          .query({
            access_token: tokenAdmin
          })
          .send({
            provider: 'local',
            name: 'Created Agent',
            email: 'created@agent.com',
            password: 'hashedPassword',
            mdph: testMdph._id
          })
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            result = res.body;
            result.should.have.property('token');
            result.should.have.property('id');
            result.should.have.property('profile');
            done();
          });
      });
    });

    describe('Generate a token to reset a password', function() {
      it('should respond 200 and generate a token for the user', done => {
        let result;

        api
          .post('/api/users/generate_token/')
          .send({
            email: testUser.email,
            mdph: 'test'
          })
          .expect(200)
          .end(function(err, res) {
            User
              .findById(testUser._id)
              .select('newPasswordToken')
              .exec(function(err, user) {
                user.should.have.property('newPasswordToken');
                user.newPasswordToken.should.not.equal('');
                done();
              });
          });
      });
    });

    describe('Reset the password of the specified user', function() {
      let result;
      let pwdToken = '1234';

      beforeEach(done => {
        testUser.newPasswordToken = pwdToken;
        testUser.save(function(err) {
          if (err) console.log(err);

          done();
        });
      });

      it('should respond 200 and reset the user password', done => {
        api
          .post(`/api/users/${testUser._id}/reset_password/${pwdToken}/`)
          .send({
            mdph: 'test',
            newPassword: 'hashedPassword'
          })
          .expect(200)
          .end(function(err, res) {
            User
              .findById(testUser._id)
              .select('newPasswordToken')
              .exec(function(err, user) {
                user.should.have.property('newPasswordToken');
                user.newPasswordToken.should.equal('');
                done();
              });
          });
      });
    });

    describe('Confirm email for the specified user', function() {
      let result;
      let emailToken = '1234';

      beforeEach(done => {
        testUser.newMailToken = emailToken;
        testUser.unconfirmed = true;
        testUser.save(function(err) {
          if (err) console.log(err);
          done();
        });
      });

      it('should respond 200 and confirm the user email', done => {
        api
          .post(`/api/users/${testUser._id}/confirmer_mail/${emailToken}/`)
          .expect(200)
          .end(function(err, res) {
            User
              .findById(testUser._id)
              .exec(function(err, user) {
                user.unconfirmed.should.equal(false);
                done();
              });
          });
      });
    });

    describe('Resend the email to confirm the specified user adress', function() {
      it('should respond 200 ', done => {
        api
          .post(`/api/users/${testUser._id}/resend_confirmation/`)
          .send({
            mdph: 'test'
          })
          .expect(200, done);
      });
    });
  });

  describe('PUT', function() {
    describe('Change the password of the specified user', function() {
      before(done => {
        testUser.password = '1234';
        testUser.save(err => {
          done();
        });
      });

      it('should respond 200 and reset the user password', done => {
        api
          .put(`/api/users/${testUser._id}/password/`)
          .query({
            access_token: token
          })
          .send({
            oldPassword: '1234',
            newPassword: '5678'
          })
          .expect(200, done);
      });
    });

  });

  describe('DELETE', function() {
    let idUserToDelete;

    before(done => {
      var fakeUser = new User({
        provider: 'local',
        name: 'Delete User',
        email: 'delete@test.com',
        password: 'hashedPassword',
        role: 'user'
      });

      return fakeUser.save(function(err) {
        if (err) console.log(err);

        User
          .findOne({email: 'delete@test.com'})
          .exec(function(err, user) {
            idUserToDelete = user._id;
            done();
          });
      });
    });

    describe('Delete the specified user by an Admin', function() {
      it('should respond 204 ', done => {
        api
          .delete(`/api/users/${idUserToDelete}/`)
          .query({
            access_token: tokenAdminMdph
          })
          .expect(204, done);
      });
    });
  });

});
