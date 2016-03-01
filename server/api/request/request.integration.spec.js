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
    // Clear mdphs before testing
    Request.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Request.remove().exec().then(function() {
      done();
    });
  });

  describe('Update Request', function() {

    describe('When the user is authenticated', function() {
      var updatedRequest;

      beforeEach(function(done) {
        var newRequest = new Request({ shortId: '1234' });

        newRequest.save(function() {
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
              done();
            });
        });
      });

      it('should respond with the updated thing', function() {
        updatedRequest.mdph.should.equal('updatedMDPH');
      });

    });

    describe('When the request does not exist', function() {

      it('should return 404', function(done) {
        //given
        var newRequest = new Request({ shortId: 'this_is_not_a_shortid' });

        //when
        newRequest.save(function() {
          var token = getToken();

          //then
          api()
            .put('/api/requests/1234?access_token=' + token)
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

    // describe('Update Documents', function() {
    //   describe('When the document exists', function() {
    //
    //     it('should return 200', function(done) {
    //       //given
    //       var newRequest = new Request({ shortId: '1234' });
    //
    //       //when
    //       newRequest.save(function() {
    //         var token = getToken();
    //
    //         //then
    //         api()
    //           .put('/api/requests/1234?access_token=' + token)
    //           .expect(200, done);
    //       });
    //     });
    //
    //   });
    // });
  });

});
