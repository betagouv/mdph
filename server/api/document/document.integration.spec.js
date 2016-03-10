'use strict';

var should = require('should');
var Request = require('../request/request.model');
var controller = require('../request/request.controller');
var startServer = require('../../test/utils/server');
var User = require('../user/user.model');

describe('Document Integration', function() {
  var api;
  var token;
  var testUser;

  before(function(done) {
    startServer((result) => {
      api = result.api;
      token = result.token;
      testUser = result.fakeUser;
      done();
    });
  });

  describe('Get single Document', function() {
    beforeEach(function(done) {
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

    afterEach(function(done) {
      Request.remove().exec(done);
    });
  });

  describe('Delete Document', function() {

    afterEach(function(done) {
      Request.remove().exec(done);
    });

    describe(`When the request is 'en cours'`, function() {
      var savedDocument;

      beforeEach(function(done) {
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
          user: testUser._id,
          status: 'en_cours'
        });

        newRequest.save((err, res) => {
          savedDocument = res.documents[0];
          done();
        });
      });

      it('should respond 200', function(done) {
        api
          .delete(`/api/requests/1234/document/${savedDocument._id}?access_token=${token}`)
          .expect(200)
          .end(function(err, res) {
            return done(err);
          });
      });
    });

    describe(`When the request is 'en_attente_usager'`, function() {
      var savedDocument;

      beforeEach(function(done) {
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
          user: testUser._id,
          status: 'en_attente_usager'
        });

        newRequest.save((err, res) => {
          savedDocument = res.documents[0];
          done();
        });
      });

      it('should respond 200', function(done) {
        api
          .delete(`/api/requests/1234/document/${savedDocument._id}?access_token=${token}`)
          .expect(200)
          .end(function(err, res) {
            return done(err);
          });
      });
    });

    describe(`When the request is 'emise'`, function() {
      var savedDocument;

      beforeEach(function(done) {
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
          user: testUser._id,
          status: 'emise'
        });

        newRequest.save((err, res) => {
          savedDocument = res.documents[0];
          done();
        });
      });

      it('should respond 403', function(done) {
        api
          .delete(`/api/requests/1234/document/${savedDocument._id}?access_token=${token}`)
          .expect(403)
          .end(function(err, res) {
            done(err);
          });
      });
    });

  });
});
