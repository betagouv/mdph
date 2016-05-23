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

    describe('when there is a working synthese (without request)', function() {
      const SyntheseController = require('./synthese.controller');

      const fakeRequest = {
        request: {
          _id: fakeRequestId
        }
      };

      const fakeOptions = {
        syntheses: [
          {
            request: {
              _id: fakeRequestId
            },
          },
          {}
        ],
        req: fakeRequest
      };

      it('should select the working synthese', function(done) {
        SyntheseController.findOrCreateRequestSynthese(fakeOptions).then(result => {
          should.exist(result);
          result[1].current.should.be.exactly(true);
          (typeof result[1].request === 'undefined').should.be.exactly(true);
          result.should.have.length(2);
          done();
        });
      });
    });

    describe('when there is no working synthese', function() {

      const anotherFakeRequestId = new mongoose.Types.ObjectId();

      const fakeCreatedSynthese = {
        toObject() {
          return this;
        }
      };

      const fakeRequest = {
        request: {
          _id: fakeRequestId
        }
      };

      SyntheseMock.create = sinon.stub().resolves(fakeCreatedSynthese);

      const SyntheseController = proxyquire('./synthese.controller', {
        './synthese.model': {
          default: SyntheseMock
        }
      });

      it('should create a synthese without request and select it', function(done) {
        const fakeOptions = {
          syntheses: [
            {
              request: {
                _id: fakeRequestId
              }
            }
          ],
          req: fakeRequest
        };

        SyntheseController.findOrCreateRequestSynthese(fakeOptions).then(result => {
          should.exist(result);
          result[1].current.should.be.exactly(true);
          (typeof result[1].request === 'undefined').should.be.exactly(true);
          result.should.have.length(2);
          done();
        });
      });
    });
  });
});
