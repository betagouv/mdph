'use strict';

var should = require('should');
var Mdph = require('./mdph.model');

var serverTest = require('../../test/utils/server');

var mdph = new Mdph({
  name: 'FakeMDPH',
  zipcode: '00000'
});

describe('Mdph Model', function() {
  var server = serverTest();
  var api = server.api;

  before(function(done) {
    // Clear mdphs before testing
    Mdph.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Mdph.remove().exec().then(function() {
      done();
    });
  });

  it('should respond with JSON array', function(done) {
    api()
      .get('/api/mdphs')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should begin with no mdphs', function(done) {
    Mdph.find({}, function(err, mdphs) {
      mdphs.should.have.length(0);
      done();
    });
  });

  it('should render the rigth number of mdph', function(done) {
    mdph.save(function() {
      Mdph.find({}, function(err, mdphs) {
        mdphs.should.have.length(1);
        done();
      });
    });
  });
});
