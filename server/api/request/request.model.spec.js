'use strict';

var should = require('should');
var Request = require('./request.model');

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

});
