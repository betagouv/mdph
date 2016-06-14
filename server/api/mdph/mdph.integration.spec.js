'use strict';

import should from 'should';
import * as controller from './mdph.controller';
import {startServer} from '../../test/utils/server';
import {populate} from '../../test/utils/seed';
import User from '../user/user.model';
import Mdph from '../mdph/mdph.model';

describe('Mdph Integration', function() {
  var api;
  var server;
  var token;
  var tokenAdminMdph;
  var testUser;
  var testMdph;

  before(function(done) {
    startServer((result) => {
      server = result.server;
      api = result.api;

      populate((result) => {
        tokenAdminMdph = result.tokenAdminMdph;
        testUser = result.fakeUser;
        testMdph = result.testMdph;
        token = result.token;
        done();
      });
    });
  });

  after(done => {
    server.close();
    done();
  });

  describe('When asking requests for an MDPH', function() {
    var wrongMdph = new Mdph({zipcode: 'wrong'});

    before(function(done) {
      wrongMdph.save(done);
    });

    after(function(done) {
      wrongMdph.remove(done);
    });

    it('should fail if the user is not admin of that MDPH', done => {
      api
        .get(`/api/mdphs/${wrongMdph.zipcode}/categories/document-types?access_token=${tokenAdminMdph}`)
        .expect(403)
        .end(function(err) {
          done();
        });
    });

    it('should succeed if the user is an admin of that MDPH', done => {
      api
        .get(`/api/mdphs/${testMdph.zipcode}/categories/document-types?access_token=${tokenAdminMdph}`)
        .expect(200)
        .end(function(err) {
          done();
        });
    });

    it('should fail if the user is not an admin', done => {
      api
        .get(`/api/mdphs/${testMdph.zipcode}/categories/document-types?access_token=${token}`)
        .expect(403)
        .end(function(err) {
          done();
        });
    });
  });
});
