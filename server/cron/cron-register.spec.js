'use strict';
/*
import moment from 'moment';
import {checkRequestExpiration} from './cron-register';
import Request from '../api/request/request.model';
import User from '../api/user/user.model';

describe('Test cron method', function() {

  const expirationDate = moment().add(-5, 'years').hours(0).minutes(0).seconds(0).milliseconds(0);

  before(function() {

  var testUser = new User({
    shortId: '2345',
    email: 'test@mail.com'
  });

  var expirateRequest = new Request({
      shortId: '1234',
      updatedAt: moment(expirationDate).add(-1, 'day'),
      user: testUser._id
    });

    expirateRequest.save();

  });

 it('check expired demand', function() {
   console.log('debut du test');
   checkRequestExpiration();

    Request.count({
      "updatedAt": {"$lt": expirationDate}
    })
    .exec()
    .then(function(count) {
      count.should.be.equals(0);
    });
  });

});
*/
