'use strict';

var should = require('should');
var controller = require('./document-category.controller');
var startServer = require('../../test/utils/server');
var User = require('../user/user.model');
var Mdph = require('../mdph/mdph.model');
var DocumentCategory = require('./document-category.model');

describe('Document Category Integration', function() {
  var api;
  var server;
  var tokenAdminMdph;
  var testMdph;

  before(function(done) {
    startServer((result) => {
      server = result.server;
      api = result.api;
      tokenAdminMdph = result.tokenAdminMdph;
      testMdph = result.testMdph;
      done();
    });
  });

  before(done => {
    DocumentCategory.remove().exec(done);
  });

  after(done => {
    server.close();
    done();
  });

  after(done => {
    DocumentCategory.remove().exec(done);
  });

  describe('When asking unclassfied documents', function() {
    it('should return a list', done => {
      api
        .get(`/api/mdphs/${testMdph.zipcode}/categories/document-types?access_token=${tokenAdminMdph}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.should.be.an.Array();
          done();
        });
    });

    it('should fail when the mdph does not exist', done => {
      api
        .get(`/api/mdphs/random_id_does_not_exist/categories/document-types?access_token=${tokenAdminMdph}`)
        .expect(404)
        .end(done);
    });
  });

  describe('When saving a new document category', function() {
    it('should return the default new category', done => {
      api
        .post(`/api/mdphs/${testMdph.zipcode}/categories?access_token=${tokenAdminMdph}`)
        .send({
          position: 0
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.should.have.property('label');
          res.body.label.should.be.eql('Nouvelle catégorie');
          /*jshint -W030 */
          res.body.unclassified.should.be.false;
          res.body.required.should.be.false;
          res.body.position.should.be.a.Number;
          res.body.position.should.eql(0);
          done();
        });
    });

    it('should return saved category', done => {
      api
        .get(`/api/mdphs/${testMdph.zipcode}/categories?access_token=${tokenAdminMdph}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          /*jshint -W030 */
          res.body.should.be.an.Array;
          return done();
        });
    });
  });

  describe.only('When getting default document categories', function() {
    before(done => {
      DocumentCategory.remove().exec(done);
    });

    it('should return the unclassified category even if it does not exist beforehand', done => {
      api
        .get(`/api/mdphs/${testMdph.zipcode}/categories/unclassifiedCategory?access_token=${tokenAdminMdph}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          //{mdph: req.mdph._id, unclassified: true, label: 'Documents non catégorisés'}
          /*jshint -W030 */
          res.body.should.have.property('unclassified');
          res.body.should.have.property('label');
          res.body.should.have.property('mdph');

          res.body.unclassified.should.be.true;
          res.body.label.should.be.eql('Documents non catégorisés');
          res.body.mdph.should.be.eql(testMdph._id.toString());
          return done(err);
        });
    });

    it('should return the required category even if it does not exist beforehand', done => {
      api
        .get(`/api/mdphs/${testMdph.zipcode}/categories?access_token=${tokenAdminMdph}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          //{mdph: req.mdph._id, unclassified: true, label: 'Documents non catégorisés'}
          /*jshint -W030 */
          res.body.should.be.an.Array;

          var requiredCategory = res.body[0];

          requiredCategory.should.have.property('required');
          requiredCategory.should.have.property('label');
          requiredCategory.should.have.property('mdph');

          requiredCategory.required.should.be.true;
          requiredCategory.label.should.be.eql('Document de la demande');
          requiredCategory.mdph.should.be.eql(testMdph._id.toString());
          return done(err);
        });
    });
  });
});
