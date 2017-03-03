'use strict';

import should from 'should';
import Request from '../request/request.model';
import * as path from 'path';
import * as fs from 'fs';
import config from '../../config/environment';

import crypto from 'crypto';

import {startServer} from '../../test/utils/server';
import {populate} from '../../test/utils/seed';

function fileToSha(file) {
  const hash = crypto.createHash('sha256');
  hash.update(file);
  return hash.digest('hex');
}

describe('Document Integration', function() {
  var api;
  var token;
  var testUser;

  let testFile = path.join(config.root + '/server/test/server/uploads/', 'test.jpg');

  before(function(done) {
    startServer((result) => {
      api = result.api;

      populate((result) => {
        token = result.token;
        testUser = result.fakeUser;
        done();
      });
    });
  });

  beforeEach(done => {
    Request.remove().exec(done);
  });

  afterEach(function(done) {
    Request.remove().exec(done);
  });

  describe('Create a single Document', function() {
    let savedDocument;

    beforeEach(function(done) {
      var newRequest = new Request({
        shortId: '1234',
        prestations: ['AAH'],
        renouvellements: ['PCH'],
        user: testUser._id
      });

      newRequest.save(() => {
        done();
      });
    });

    afterEach(function(done) {
      fs.unlink(savedDocument.path, done);
    });

    it('should respond 201 and return the created document', function(done) {
      api
        .post(`/api/requests/1234/document/?access_token=${token}`)
        .send({
          type: 'carteIdentite',
          originalname: 'carte-identite.jpg',
          filename: 'hashed-carte-identite',
          mimetype: 'image/jpeg'
        })
        .attach('file', testFile)
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          savedDocument = res.body;
          should.exist(savedDocument._id);
          savedDocument.originalname.should.be.exactly('test.jpg');
          done();
        });
    });

  });

  describe('Get single Document', function() {
    let savedDocument;
    let shaFile;
    let file;

    before(function(done) {
      file = fs.readFileSync(testFile, 'utf8');
      shaFile = fileToSha(file);
      done();
    });

    beforeEach(function(done) {
      let newRequest = new Request({
        shortId: '1234',
        prestations: ['AAH'],
        renouvellements: ['PCH'],
        user: testUser._id
      });

      newRequest.save(() => {
        api
          .post(`/api/requests/1234/document/?access_token=${token}`)
          .send({
            type: 'carteIdentite',
            originalname: 'carte-identite.jpg',
            filename: 'hashed-carte-identite',
            mimetype: 'image/jpeg'
          })
          .attach('file', testFile)
          .then((res) => {
            savedDocument = res.body;

            done();
          });
      });
    });

    afterEach(function(done) {
      fs.unlink(savedDocument.path, done);
    });

    it('should respond 200 and return the document', function(done) {
      api
        .get(`/api/requests/1234/document/${savedDocument.filename}?access_token=${token}`)
        .expect(200)
        .end((err, res) => {
          let shaRes = fileToSha(res.text);
          shaRes.should.equal(shaFile);
          done();
        });
    });
  });

  describe('Update a single Document', function() {
    let savedDocument;

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

      newRequest.save((err, res) => {
        savedDocument = res.documents[0];
        done();
      });
    });

    it('should respond 200 and return the updated document', function(done) {
      api
        .put(`/api/requests/1234/document/${savedDocument._id}?access_token=${token}`)
        .send({
          isInvalid: true
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          res.body.isInvalid.should.be.exactly(true);
          done();
        });
    });

  });

  describe('Delete Document', function() {
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
          .expect(204)
          .end(function(err) {
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
          .end(function(err) {
            done(err);
          });
      });
    });

  });
});
