'use strict';

/* import moment from 'moment';
import checkRequestValidity from './cron-register';
import Request from '../api/request/request.model';
import User from '../api/user/user.model';

describe('Test cron method', function() {

  const expiredDate = moment().add(-5, 'years').hours(0).minutes(0).seconds(0).milliseconds(0);

  before(function() {

  var testUser = new User({
    shortId: '2345',
    email: 'test@mail.com'
  });

  var expiredRequest = new Request({
      shortId: '1234',
      updatedAt: moment(expiredDate).add(-1, 'day'),
      user: testUser._id
    });

    expiredRequest.save();

  });

 describe('check expired demand', function() {
    checkRequestValidity();

    Request.count({
      "updatedAt": {"$lt": expiredDate}
    })
    .exec()
    .then(function(count) {
      count.should.be.equals(0);
    });
  });

});*/
