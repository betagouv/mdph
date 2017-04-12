'use strict';

import Synthese from './synthese.model';
import Profile from '../profile/profile.model';

import { startServer } from '../../../test/utils/server';
import { populate } from '../../../test/utils/seed';

describe('Synthese Integration', function() {
  let api;
  let token;
  let tokenAdmin;
  let tokenAdminMdph;
  let testUser;
  let server;
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

  describe('Get a single Synthese', function() {
    describe('as a regular user', function() {
      it('should be forbidden', done => {
        api
          .get(`/api/mdphs/test/syntheses/${newProfile._id}/syntheses?access_token=${token}`)
          .expect(403, done);
      });
    });

    describe('as an admin', function() {
      it('should return a new synthese if none exist', done => {
        api
          .get(`/api/mdphs/test/syntheses/${newProfile._id}?access_token=${tokenAdminMdph}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            res.body.length.should.be.exactly(1);
            res.body[0].current.should.be.exactly(true);
            done();
          });
      });

      it('should return two syntheses if one aleady exists', done => {
        Synthese.create({ profile: newProfile._id}).then(() => {
          api
            .get(`/api/mdphs/test/syntheses/${newProfile._id}?access_token=${tokenAdminMdph}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }

              res.body.length.should.be.exactly(2);
              res.body[1].current.should.be.exactly(true);
              done();
            });
        });
      });
    });
  });

  describe('Update Synthese', function() {
    it('should respond with the updated synthese', done => {
      api
        .get(`/api/mdphs/test/syntheses/${newProfile._id}?access_token=${tokenAdminMdph}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          const currentSynthese = res.body[0];

          api
            .put(`/api/mdphs/test/syntheses/${newProfile._id}/syntheses/${currentSynthese._id}?access_token=${tokenAdmin}`)
            .send({
              geva: 'updatedGeva'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }

              res.body.geva.should.equal('updatedGeva');
              done();
            });
        });
    });
  });
});
