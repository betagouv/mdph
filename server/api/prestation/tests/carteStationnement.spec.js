'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestations.json');

var carteStationnement = prestations[0];

describe('Simulation prestations : carteStationnement ', function() {

  it('should return carteStationnement', function(done) {
    var answers = {
      vie_quotidienne: {
        "besoinsDeplacement": {
          "intraDomicile": true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(carteStationnement);
    done();
  });

  it('should return carteStationnement', function(done) {
    var answers = {
      vie_quotidienne: {
        "besoinsDeplacement": {
          "public": true
        },
        "attentesTypeAide": {
          "humain": true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(carteStationnement);
    done();
  });

  it('should return carteStationnement', function(done) {
    var answers = {
      vie_quotidienne: {
        "besoinsDeplacement": {
          "public": true
        },
        "attentesTypeAide": {
          "humain": true,
          "mobilite": true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(carteStationnement);
    done();
  });

  it('should return carteStationnement', function(done) {
    var answers = {
      vie_quotidienne: {
        "aideTechnique": {
          "aideTechnique_technique": true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(carteStationnement);
    done();
  });

});


