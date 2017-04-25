'use strict';

import {startServer} from '../../../test/utils/server';
import {populate} from '../../../test/utils/seed';
import Mdph from '../mdph/mdph.model';

describe('Stats Integration', function() {
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

  describe.only('When get likes stats', function() {
    var mdph = new Mdph({name: 'test1', likes : ['user1@mail.com', 'user2@mail.com', 'user3@mail.com']});

    before(function(done) {
      mdph.save(done);
    });

    after(function(done) {
      mdph.remove(done);
    });

    it('should succeed', done => {
      api
        .get(`/api/stats/likes`)
        .expect(200)
        .end(function(err, res) {
          var data = res.body;
          data.should.be.ok();
          data[0].mdph.should.be.equal('test1');
          data[0].count.should.be.equal(3);
          done();
        });
    });

  });
});
