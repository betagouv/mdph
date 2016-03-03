'use strict';

var should = require('should');
var Request = require('./request.model');
var controller = require('./request.controller');
var serverTest = require('../../test/utils/server');
var User = require('../user/user.model');

describe('Request Integration', function() {
  var server = serverTest();
  var api = server.api;
  var getToken = server.token;

  before(function(done) {
    Request.remove().exec(done);
  });

  describe('Get single Request', function() {
    before(function(done) {
      var newRequest = new Request({
        shortId: '1234',
        prestations: ['AAH'],
        renouvellements: ['PCH'],
        documents: [{
          type: 'carteIdentite',
          originalname: 'carte-identite.jpg',
          filename: 'hashed-carte-identite',
          mimetype: 'image/jpeg'
        }]
      });
      newRequest.save(done);
    });

    after(function(done) {
      Request.remove().exec(done);
    });

    it('should get the specified populated request', function(done) {
      var gettedRequest;
      var token = getToken();

      api()
        .get('/api/requests/1234?access_token=' + token)
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

    before(function(done) {
      var newRequest = new Request({ shortId: '1234' });
      newRequest.save(done);
    });

    after(function(done) {
      Request.remove().exec(done);
    });

    describe('When the user is authenticated', function() {
      describe('When the request exist', function() {

        it('should respond with the updated thing', function(done) {
          var updatedRequest;
          var token = getToken();

          api()
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
        it('should return 404', function(done) {
          var token = getToken();

          api()
            .put('/api/requests/9876?access_token=' + token)
            .send({
              mdph: 'updatedMDPH'
            })
            .expect(404, done);
        });
      });

    });

    describe('When the user is not authenticated', function() {
      var newRequest = new Request({ shortId: '1234' });

      //when
      newRequest.save(function() {

        //then
        it('should return 401', function(done) {
          api()
            .put('/api/requests/1234')
            .expect(401, done);
        });
      });
    });

  });

  describe('Delete Documents', function() {
    describe('When the request is en cours', function() {
      var idDoc;

      //initialize a request
      before(function(done) {
        var newDocument = {
          type: 'carteIdentite',
          path: 'toto'
        };

        var newRequest = new Request({
          shortId: '1234',
          status: 'en_cours',
          documents: [newDocument]
        });

        newRequest.save(function(err, request) {
          if (err) {
            return done(err);
          }

          idDoc = request.documents[0]._id;
          done();
        });
      });

      after(function(done) {
        //clear mdphs after testing
        Request.remove().exec(done);
      });

      it('should return 200', function(done) {
        var token = getToken();

        api()
          .delete('/api/requests/1234/document/' + idDoc + '?access_token=' + token)
          .expect(200, done);
      });

    });
  });

});
