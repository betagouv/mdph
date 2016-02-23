'use strict';

var should = require('should');
var Request = require('./request.model');
var controller = require('./request.controller');
var serverTest = require('../../test/utils/server');
var User = require('../user/user.model');

describe('Request Model', function() {
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

  it('should render the right number of requests', function(done) {
    //given
    var newRequest = new Request({});

    //when
    newRequest.save(function() {

      //then
      Request.find({}, function(err, requests) {
        requests.should.have.length(1);
        done();
      });
    });
  });

  describe('When the user is authenticated', function() {

    it('should return 200', function(done) {
      //given
      var newRequest = new Request({shortId: '1234'});

      //when
      newRequest.save(function() {
        var token = getToken();

        //then
        api()
          .put('/api/requests/1234?access_token=' + token)
          .expect(200, done);
      });
    });

  });

  describe('When the request does not exist', function() {

    it('should return 404', function(done) {
      //given
      var newRequest = new Request({shortId: 'this_is_not_a_shortid'});

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
    var newRequest = new Request({shortId: '1234'});

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
