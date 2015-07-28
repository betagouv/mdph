'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestations.json');

var pps = prestations[8];

describe('Simulation prestations : pps ', function() {

  it('should return pps', function(done) {
    var answers = {
      situations_particulieres: {
        urgences: {
          ecole: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(pps);
    done();
  });

  it('should return pps', function(done) {
    var answers = {
      situations_particulieres: {
        urgences: {
          etablissement: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(pps);
    done();
  });

  it('should return pps', function(done) {
    var answers = {
      vie_scolaire: {
        attentesVieScolaire: {
          orientation: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(pps);
    done();
  });

  it('should not return pps', function(done) {
    var answers = {
      vie_scolaire: {
        attentesVieScolaire: {
          orientation: false
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(pps);
    done();
  });

});
