'use strict';

import Request from './request.model';
import User from '../user/user.model';

describe('Request Model', function() {
  before(function(done) {
    Request.remove().exec(done);
  });

  afterEach(function(done) {
    Request.remove().exec(done);
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
