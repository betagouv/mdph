'use strict';

var should = require('should');
var Mdph = require('./mdph.model');

var startServer = require('../../test/utils/server');

var mdph = new Mdph({
  name: 'FakeMDPH',
  zipcode: '00000'
});

describe('Mdph Model', function() {
  var api;

  before(done => {
    startServer(result => {
      api = result.api;
      done();
    });
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
