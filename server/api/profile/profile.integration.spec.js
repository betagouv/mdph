'use strict';

import Request from '../request/request.model';
import Profile from './profile.model';

import {startServer} from '../../../test/utils/server';
import {populate} from '../../../test/utils/seed';

describe('Profile Integration', () => {

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

  describe('Profile count', () => {

    before(done => {
      Profile.remove().then(() => done());
    });

    describe('for 0 profile', () => {

      it('should return 0', done => {
        api
          .get(`/api/users/${testUser._id}/profiles/count?access_token=${token}`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            res.body.count.should.be.exactly(0);
            done();
          });
      });
    });

    describe('for 1 profile', () => {

      before(done => {
        Profile.create({user: testUser._id}).then(() => {
          done();
        });
      });

      after(done => {
        Profile.remove().then(() => done());
      });

      it('should return 1', done => {
        api
          .get(`/api/users/${testUser._id}/profiles/count?access_token=${token}`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            res.body.count.should.be.exactly(1);
            done();
          });
      });
    });

    describe('for 2 profiles', () => {

      before(done => {
        Profile.create({user: testUser._id}).then(() => {
          Profile.create({user: testUser._id}).then(() => {
            done();
          });
        });
      });

      after(done => {
        Profile.remove().then(() => done());
      });

      it('should return 2', done => {
        api
          .get(`/api/users/${testUser._id}/profiles/count?access_token=${token}`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            res.body.count.should.be.exactly(2);
            done();
          });
      });
    });

  });

  describe('Get current Request', () => {
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

    describe('When the user has no request with status "en_cours"', () => {

      before(done => {
        Request.remove().then(() => done());
      });

      it('should return 200', done => {
        api
          .get(`/api/users/${testUser._id}/profiles/${fakeProfile._id}/requests/current?access_token=${token}`)
          .expect(200)
          .end(done);
      });
    });

    describe('When the user has a request with status "emise"', () => {
      before(done => {
        Request.remove().then(() => done());
      });

      before(done => {
        Request.create({
          user: testUser._id,
          profile: fakeProfile._id,
          mdph: testMdph.zipcode,
          status: 'emise'
        }).then(() => done());
      });

      it('should return the request with that status', done => {
        api
          .get(`/api/users/${testUser._id}/profiles/${fakeProfile._id}/requests/current?access_token=${token}`)
          .expect(200)
          .end((err, res) => {
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
