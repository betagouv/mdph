'use strict';

import should from 'should';
import Request from './request.model';
import * as controller from './request.controller';
import User from '../user/user.model';
import Profile from '../profile/profile.model';

import {startServer} from '../../test/utils/server';
import {populate} from '../../test/utils/seed';

describe('Request Integration', function() {

  var api;
  var token;
  var testUser;
  var server;
  var testMdph;

  before(done => {
    startServer((result) => {
      server = result.server;
      api = result.api;

      populate((result) => {
        token = result.token;
        testUser = result.fakeUser;
        testMdph = result.testMdph;
        done();
      });
    });
  });

  after(done => {
    server.close();
    done();
  });

  describe('Get single Request', function() {
    beforeEach(done => {
      var newRequest = new Request({
        shortId: '1234',
        prestations: ['AAH'],
        renouvellements: ['PCH'],
        documents: [{
          type: 'carteIdentite',
          originalname: 'carte-identite.jpg',
          filename: 'hashed-carte-identite',
          mimetype: 'image/jpeg'
        }],
        user: testUser._id
      });

      newRequest.save(done);
    });

    afterEach(done => {
      Request.remove().then(() => done());
    });

    it('should get the specified populated request', done => {
      var gettedRequest;

      api
        .get(`/api/requests/1234?access_token=${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          gettedRequest = res.body;
          gettedRequest.should.have.property('detailPrestations');
          gettedRequest.should.have.property('detailRenouvellements');
          gettedRequest.should.have.property('documents');
          gettedRequest.documents.should.have.property('obligatoires');
          done();
        });
    });
  });

  describe('Update Request', function() {

    beforeEach(done => {
      var newRequest = new Request({ shortId: '1234', user: testUser._id });
      newRequest.save(done);
    });

    afterEach(done => {
      Request.remove().then(() => done());
    });

    describe('When the user is authenticated', function() {
      describe('When the request exist', function() {
        it('should respond with the updated thing', done => {
          var updatedRequest;

          api
            .put('/api/requests/1234?access_token=' + token)
            .send({
              mdph: 'updatedMDPH'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }

              updatedRequest = res.body;
              updatedRequest.mdph.should.equal('updatedMDPH');
              done();
            });
        });

      });

      describe('When the request does not exist', function() {
        it('should return 404', done => {
          api
            .put(`/api/requests/9876?access_token=${token}`)
            .send({
              mdph: 'updatedMDPH'
            })
            .expect(404, done);
        });
      });

    });

    describe('When the user is not authenticated', function() {
      it('should return 401', done => {
        //given
        var newRequest = new Request({ shortId: '1234', user: testUser._id });

        //when
        newRequest.save(function() {
          //then
          api
            .put('/api/requests/1234')
            .expect(401, done);
        });
      });
    });
  });

  describe('Request worflow', function() {
    let profile;
    let request;

    before(done => {
      Request.remove().then(() => done());
    });

    before(done => {
      Profile.create({user: testUser._id, vie_quotidienne: 'content_vie_quotidienne', identites: 'content_identites'}).then(created => {
        profile = created;
        done();
      });
    });

    it('should create a valid request', done => {
      api
        .post(`/api/requests?access_token=${token}`)
        .send({ profile: profile._id, user: testUser._id })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          request = res.body;
          request.profile.should.equal(profile.id);
          request.user.should.equal(testUser.id);

          done();
        });
    });

    it('should submit that same request', done => {
      let action = {
        id: 'submit',
        prestations: ['aah', 'pch'],
        renouvellements: ['aeeh'],
        mdph: ['14'],
        renouvellement: true,
        old_mdph: ['54'],
        numeroDossier: 'legacy_id'
      };

      api
        .post(`/api/requests/${request.shortId}/action?access_token=${token}`)
        .send(action)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          request = res.body;
          request.profile.should.equal(profile.id);
          request.user._id.should.equal(testUser.id);

          request.formAnswers.vie_quotidienne.should.equal('content_vie_quotidienne');
          request.formAnswers.identites.should.equal('content_identites');

          done();
        });
    });
  });
});
