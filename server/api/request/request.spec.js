'use strict';

var should = require('should');
var Request = require('./request.model');
var controller = require('./request.controller');

var Actions = require('../../components/actions').actions;

var serverTest = require('../../test/utils/server');

describe('Request Model', function() {
  var server = serverTest();
  var api = server.api;

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
      api()
        .put('/api/requests/1234')
        .expect(200, done);
    });

  });

  describe('When the user is not authenticated', function() {

    it('should return 401', function(done) {
      api()
        .put('/api/requests/1234')
        .expect(401, done);
    });

  });

});
