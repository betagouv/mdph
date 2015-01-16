'use strict';

var should = require('should');
var Request = require('./request.model');
var controller = require('./request.controller');

describe('Request Model', function() {
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

  it('should render the rigth number of requests', function(done) {
    var newRequest = new Request({});
    newRequest.save(function() {
      Request.find({}, function(err, requests) {
        requests.should.have.length(1);
        done();
      });
    });
  });
});
