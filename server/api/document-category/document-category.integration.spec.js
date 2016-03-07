// 'use strict';
//
// var should = require('should');
// var controller = require('./document-category.controller');
// var startServer = require('../../test/utils/server');
// var User = require('../user/user.model');
// var Mdph = require('../mdph/mdph.model');
// var DocumentCategory = require('./document-category.model');
//
// describe('Document Category Integration', function() {
//   var api;
//   var server;
//   var tokenAdmin;
//   var testUser;
//   var testMdph;
//
//   before(function(done) {
//     startServer((result) => {
//       server = result.server;
//       api = result.api;
//       tokenAdmin = result.tokenAdmin;
//       testUser = result.fakeUser;
//       testMdph = result.testMdph;
//       done();
//     });
//   });
//
//   after(done => {
//     server.close();
//     done();
//   });
//
//   beforeEach(done => DocumentCategory.remove().exec(done));
//   afterEach(done => DocumentCategory.remove().exec(done));
//
//   describe('When asking unclassfied MDPH', function() {
//     it('should return the correct list', done => {
//       var response;
//
//       api
//         .get(`/api/mdphs/${testMdph._id}/categories/document-types?access_token=${tokenAdmin}`)
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end(function(err, res) {
//           if (err) {
//             return done(err);
//           }
//
//           response = res.body;
//           response.should.have.property('detailPrestations');
//           response.should.have.property('detailRenouvellements');
//           response.should.have.property('documents');
//           response.documents.should.have.property('obligatoires');
//           done();
//         });
//     });
//
//     it('should fail when the mdph does not exist', done => {
//       var response;
//
//       api
//         .get(`/api/mdphs/random_id_does_not_exist/categories/document-types?access_token=${tokenAdmin}`)
//         .expect(404)
//         .end(done);
//     });
//   });
//
// });
