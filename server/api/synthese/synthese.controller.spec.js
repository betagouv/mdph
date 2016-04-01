'use strict';

var should = require('should');

import proxyquire from 'proxyquire';

const SyntheseController = proxyquire('./synthese.controller', {
  './synthese.model': {
    create(params) {
      return {
        then(func) {
          return func(params);
        }
      };
    }
  }
});

describe('Synthese controller', function() {
  describe('findOrCreateRequestSynthese', function() {
    describe('when there is a synthese linked to the request', function() {
      let fakeOptions = {
        syntheses: [{
          request: '1234'
        }],
        req: {
          user: '1234',
          profile: '1234',
          request: {
            _id: '1234'
          }
        }
      };
      let result;

      it('should select the synthese', function(done) {
        result = SyntheseController.findOrCreateRequestSynthese(fakeOptions);
        should.exist(result);
        result[0].selected.should.be.exactly(true);
        done();
      });
    });

    describe('when there is no synthese linked to the request', function() {
      let fakeOptions = {
        syntheses: [{
          request: '1234'
        }],
        req: {
          user: '1234',
          profile: '1234',
          request: {
            _id: '5678'
          }
        }
      };
      let result;

      it('should create the synthese and select it', function(done) {
        result = SyntheseController.findOrCreateRequestSynthese(fakeOptions);
        should.exist(result);
        result[1].selected.should.be.exactly(true);
        result[1].request.should.be.exactly('5678');
        done();
      });
    });
  });
});
