'use strict';

var should = require('should');
var Synthese = require('./synthese.model');
var controller = require('./synthese.controller');
var User = require('../user/user.model');
var Profile = require('../profile/profile.model');

import startServer from '../../test/utils/server';

describe('Synthese Integration', function() {
  let api;
  let token;
  let tokenAdmin;
  let tokenAdminMdph;
  let testUser;
  let server;
  let syntheseId;
  let profileId;
  let newSynthese;
  let newProfile;

  before(done => {
    startServer((result) => {
      server = result.server;
      api = result.api;
      token = result.token;
      tokenAdmin = result.tokenAdmin;
      tokenAdminMdph = result.tokenAdminMdph;
      testUser = result.fakeUser;
      newProfile = new Profile({
        user: testUser._id
      });

      newProfile.save(function(err, res) {
        profileId = res._id;

        newSynthese = new Synthese({
          user: testUser._id,
          profile: profileId,
          geva: 'fakeGeva'
        });

        newSynthese.save(function(err, res) {
          syntheseId = res._id;
          done();
        });
      });
    });
  });

  after(done => {
    Synthese.remove().exec();
    Profile.remove().exec();
    server.close();
    done();
  });

  describe('Create Synthese', function() {
    it('should respond 201', done => {
      var updatedSynthese;

      api
        .post(`/api/users/${testUser._id}/profiles/${profileId}/syntheses/?access_token=${tokenAdmin}`)
        .send({
          user: testUser._id,
          profile: profileId,
          geva: 'fakeGeva'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          updatedSynthese = res.body;
          updatedSynthese.geva.should.equal('fakeGeva');
          done();
        });
    });
  });

  describe('Get a single Synthese with a regular user', function() {
    describe('Get a single Synthese with a regular user', function() {
      it('should return 401', done => {
        var gettedSynthese;

        api
          .get(`/api/users/${testUser._id}/profiles/${profileId}/syntheses/${syntheseId}?access_token=${token}`)
          .expect(401, done);
      });
    });

    describe('Get a single Synthese with an admin MDPH', function() {
      it('should return the specified synthese', done => {
        var gettedSynthese;

        api
          .get(`/api/users/${testUser._id}/profiles/${profileId}/syntheses/${syntheseId}?access_token=${tokenAdminMdph}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            gettedSynthese = res.body;
            gettedSynthese.should.have.property('user');
            gettedSynthese.should.have.property('profile');
            done();
          });
      });
    });
  });

  describe('Update Synthese', function() {
    it('should respond with the updated synthese', done => {
      var updatedSynthese;

      api
        .put(`/api/users/${testUser._id}/profiles/${profileId}/syntheses/${syntheseId}?access_token=${tokenAdmin}`)
        .send({
          geva: 'updatedGeva'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          updatedSynthese = res.body;
          updatedSynthese.geva.should.equal('updatedGeva');
          done();
        });
    });
  });
});
