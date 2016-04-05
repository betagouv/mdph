'use strict';

import sinon from 'sinon';
import should from 'should';
import mongoose from 'mongoose';
import proxyquire from 'proxyquire';

require('sinon-as-promised');

describe('Synthese controller', function() {
  describe('findOrCreateRequestSynthese', function() {
    const fakeRequestId = new mongoose.Types.ObjectId();
    const Synthese = mongoose.model('Synthese');
    const SyntheseMock = sinon.mock(Synthese);

    describe('when there is a synthese linked to the request', function() {
      const fakeRequest = {
        request: {
          _id: fakeRequestId
        }
      };

      const SyntheseController = require('./synthese.controller');

      const fakeOptions = {
        syntheses: [{
          request: {
            _id: fakeRequestId
          }
        }],
        req: fakeRequest
      };

      it('should select the synthese', function(done) {
        SyntheseController.findOrCreateRequestSynthese(fakeOptions).then(result => {
          should.exist(result);
          result[0].current.should.be.exactly(true);
          result.should.have.length(1);
          done();
        });
      });
    });

    describe('when there is no synthese linked to the request', function() {

      const anotherFakeRequestId = new mongoose.Types.ObjectId();

      const fakeRequest = {
        request: {
          _id: anotherFakeRequestId
        },
        toObject() {
          return this;
        }
      };

      SyntheseMock.create = sinon.stub().resolves(fakeRequest);

      const SyntheseController = proxyquire('./synthese.controller', {
        './synthese.model': {
          default: SyntheseMock
        }
      });

      it('should create the synthese and select it', function(done) {
        const fakeOptions = {
          syntheses: [{
            request: {
              _id: fakeRequestId
            }
          }],
          req: fakeRequest
        };

        SyntheseController.findOrCreateRequestSynthese(fakeOptions).then(result => {
          should.exist(result);
          result[1].current.should.be.exactly(true);
          result[1].request._id.should.be.exactly(anotherFakeRequestId);
          result.should.have.length(2);
          done();
        });
      });
    });
  });
});
