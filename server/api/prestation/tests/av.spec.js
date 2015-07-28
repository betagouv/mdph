'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestations.json');

var av = prestations[6];

describe('Simulation prestations : AV ', function() {

  it('should return av', function(done) {
    var answers = {
      aidant: {
        vie: true,
        emploi: 'reductionActivite',
        typeAttente: {
          vieillesse: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(av);
    done();
  });

  it('should not return av', function(done) {
    var answers = {
      aidant: {
        vie: true
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(av);
    done();
  });

  it('should return av', function(done) {
    var answers = {
      aidant: {
        vie: true,
        emploi: 'reductionActivite'
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(av);
    done();
  });

  it('should return av', function(done) {
    var answers = {
      aidant: {
        typeAttente: {
          vieillesse: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(av);
    done();
  });

});
