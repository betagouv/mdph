'use strict';

import Synthese from './synthese.model';
import Profile from '../profile/profile.model';
import Request from '../request/request.model';

import {startServer} from '../../test/utils/server';
import {populate} from '../../test/utils/seed';

describe('Synthese Integration', function() {
  let api;
  let token;
  let tokenAdmin;
  let tokenAdminMdph;
  let testUser;
  let server;
  let newRequest;
  let newSynthese;
  let newProfile;

  before(done => {
    startServer((result) => {
      server = result.server;
      api = result.api;

      populate((result) => {
        token = result.token;
        tokenAdmin = result.tokenAdmin;
        tokenAdminMdph = result.tokenAdminMdph;
        testUser = result.fakeUser;

        Profile
          .create({
            user: testUser._id
          })
          .then(created => {
            newProfile = created;
            return newProfile;
          })
          .then(profile => {
            return Request.create({
              user: profile.user,
              profile: profile._id,
              shortId: '1234'
            });
          })
          .then(created => {
            newRequest = created;
            return newRequest;
          })
          .then(request => {
            return Synthese.create({
              user: request.user,
              profile: request.profile,
              request: request._id,
              geva: 'fakeGeva'
            });
          })
          .then(created => {
            newSynthese = created;
            done();
          });
      });
    });
  });

  after(done => {
    Synthese.remove().exec();
    Profile.remove().exec();
    Request.remove().exec();
    server.close();
    done();
  });

  describe('Create Synthese', function() {
    it('should respond 201', done => {
      var updatedSynthese;

      api
        .post(`/api/users/${testUser._id}/profiles/${newProfile._id}/syntheses/?access_token=${tokenAdmin}`)
        .send({
          user: testUser._id,
          profile: newProfile._id,
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
          .get(`/api/users/${testUser._id}/profiles/${newProfile._id}/syntheses/${newSynthese._id}?access_token=${token}`)
          .expect(401, done);
      });
    });

    describe('Get a single Synthese with an admin MDPH', function() {
      it('should return the specified synthese', done => {
        var gettedSynthese;

        api
          .get(`/api/users/${testUser._id}/profiles/${newProfile._id}/syntheses/${newSynthese._id}?access_token=${tokenAdminMdph}`)
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
        .put(`/api/users/${testUser._id}/profiles/${newProfile._id}/syntheses/${newSynthese._id}?access_token=${tokenAdmin}`)
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
