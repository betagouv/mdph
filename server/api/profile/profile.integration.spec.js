'use strict';

import should from 'should';
import Request from '../request/request.model';
import Profile from './profile.model';

import {startServer} from '../../test/utils/server';
import {populate} from '../../test/utils/seed';

describe('Profile Integration', function() {

  var api;
  var token;
  var testUser;
  var testMdph;

  before(done => {
    startServer((result) => {
      api = result.api;

      populate((result) => {
        token = result.token;
        testUser = result.fakeUser;
        testMdph = result.testMdph;
        done();
      });
    });
  });

  describe('Get current Request', function() {
    let fakeProfile;

    afterEach(done => {
      Request.remove().then(() => done());
    });

    before(done => {
      Profile.create({user: testUser._id}).then(created => {
        fakeProfile = created;
        done();
      });
    });

    after(done => {
      Profile.remove().then(() => done());
    });

    describe('When the user has no request with status "en_cours"', function() {

      before(done => {
        Request.remove().then(() => done());
      });

      it('should return 204', done => {
        api
          .get(`/api/users/${testUser._id}/profiles/${fakeProfile._id}/requests/current?access_token=${token}`)
          .expect(204)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            done();
          });
      });
    });

    describe('When the user has a request with status "emise"', function() {
      before(done => {
        Request.remove().then(() => done());
      });

      before(done => {
        Request.create({user: testUser._id, profile: fakeProfile._id, mdph: testMdph.zipcode, status: 'emise'}).then(() => done());
      });

      it('should return the request with that status', done => {
        api
          .get(`/api/users/${testUser._id}/profiles/${fakeProfile._id}/requests/current?access_token=${token}`)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            res.body.status.should.be.exactly('emise');
            done();
          });
      });
    });
  });
});
