'use strict';

var should = require('should');
var Request = require('./request.model');
var User = require('../user/user.model');

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
    var newUser = new User();
    var newRequest = new Request({ user: newUser._id });

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
