'use strict';

var should = require('should');
import mongoose from 'mongoose';

import proxyquire from 'proxyquire';

const SyntheseController = proxyquire('./synthese.controller', {
  './synthese.model': {
    create(params) {
      return {
        then(func) {
          params.toObject = function() {
            return {
              user: '1234',
              profile: '1234',
              request: {
                _id: params.request
              }
            };
          };

          return func(params);
        }
      };
    }
  }
});

describe('Synthese controller', function() {
  describe('findOrCreateRequestSynthese', function() {

    let fakeId = new mongoose.Types.ObjectId();
    let anotherFakeId = new mongoose.Types.ObjectId();

    describe('when there is a synthese linked to the request', function() {
      let fakeOptions = {
        syntheses: [{
          request: {
            _id: fakeId
          }
        }],
        req: {
          user: '1234',
          profile: '1234',
          request: {
            _id: fakeId
          }
        }
      };
      let result;

      it('should select the synthese', function(done) {
        result = SyntheseController.findOrCreateRequestSynthese(fakeOptions);
        should.exist(result);
        result[0].current.should.be.exactly(true);
        result.should.have.length(1);
        done();
      });
    });

    describe('when there is no synthese linked to the request', function() {

      let fakeOptions = {
        syntheses: [{
          request: {
            _id: fakeId
          }
        }],
        req: {
          user: '1234',
          profile: '1234',
          request: {
            _id: anotherFakeId
          }
        }
      };
      let result;

      it('should create the synthese and select it', function(done) {
        result = SyntheseController.findOrCreateRequestSynthese(fakeOptions);
        should.exist(result);
        result[1].current.should.be.exactly(true);
        result[1].request._id.should.be.exactly(anotherFakeId);
        result.should.have.length(2);
        done();
      });
    });
  });
});
