'use strict';

var should = require('should');
var Synthese = require('./synthese.model');
var controller = require('./synthese.controller');
var User = require('../user/user.model');

import startServer from '../../test/utils/server';

describe('Synthese Integration', function() {

  var api;
  var token;
  var testUser;
  var server;

  before(done => {
    startServer((result) => {
      server = result.server;
      api = result.api;
      token = result.token;
      testUser = result.fakeUser;
      done();
    });
  });

  after(done => {
    server.close();
    done();
  });

  describe('Get single Synthese', function() {
    beforeEach(done => {
      var newSynthese = new Synthese({
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

      newSynthese.save(done);
    });

    afterEach(done => {
      Synthese.remove().exec(done);
    });

    it('should get the specified populated synthese', done => {
      var gettedSynthese;

      api
        .get(`/api/syntheses/1234?access_token=${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          gettedSynthese = res.body;
          gettedSynthese.should.have.property('detailPrestations');
          gettedSynthese.should.have.property('detailRenouvellements');
          gettedSynthese.should.have.property('documents');
          gettedSynthese.documents.should.have.property('obligatoires');
          done();
        });
    });
  });

  describe('Update Synthese', function() {

    beforeEach(done => {
      var newSynthese = new Synthese({ shortId: '1234', user: testUser._id });
      newSynthese.save(done);
    });

    afterEach(done => {
      Synthese.remove().exec(done);
    });

    describe('When the user is authenticated', function() {
      describe('When the synthese exist', function() {
        it('should respond with the updated thing', done => {
          var updatedSynthese;

          api
            .put('/api/syntheses/1234?access_token=' + token)
            .send({
              mdph: 'updatedMDPH'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }

              updatedSynthese = res.body;
              updatedSynthese.mdph.should.equal('updatedMDPH');
              done();
            });
        });

      });

      describe('When the synthese does not exist', function() {
        it('should return 404', done => {
          api
            .put(`/api/syntheses/9876?access_token=${token}`)
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
        var newSynthese = new Synthese({ shortId: '1234', user: testUser._id });

        //when
        newSynthese.save(function() {
          //then
          api
            .put('/api/syntheses/1234')
            .expect(401, done);
        });
      });
    });
  });
});
