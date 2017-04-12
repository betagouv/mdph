'use strict';

import {startServer} from '../../../test/utils/server';

describe('Mdph Model', function() {
  var api;
  var server;

  before(done => {
    startServer(result => {
      api = result.api;
      server = result.server;
      done();
    });
  });

  after(done => {
    server.close();
    done();
  });

  it('should respond with JSON array', function(done) {
    api
      .get('/api/mdphs')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
