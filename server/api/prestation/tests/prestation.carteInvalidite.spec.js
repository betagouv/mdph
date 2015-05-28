'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestation.constants');

var carteInvalidite = prestations.all[1];

describe('Simulation prestations : carteInvalidite ', function() {

  it('should return carteInvalidite', function(done) {
    var answers = {
      vie_quotidienne: {
        besoinsVie: {
          "hygiene": true
        },
        "attentesTypeAide": {
          "humain": true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(carteInvalidite);
    done();
  });

  it('should return carteInvalidite', function(done) {
    var answers = {
      vie_quotidienne: {
        besoinsVie: {
          "habits": true
        },
        "attentesTypeAide": {
          "humain": true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(carteInvalidite);
    done();
  });

  it('should return carteInvalidite', function(done) {
    var answers = {
      vie_quotidienne: {
        besoinsVie: {
          "repas": true
        },
        "attentesTypeAide": {
          "humain": true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(carteInvalidite);
    done();
  });

  it('should return carteInvalidite', function(done) {
    var answers = {
      vie_quotidienne: {
        "besoinsDeplacement": {
          "intraDomicile": true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(carteInvalidite);
    done();
  });

  it('should return carteInvalidite', function(done) {
    var answers = {
      vie_quotidienne: {
        "pensionInvalidite": {
          "pcrtp": true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(carteInvalidite);
    done();
  });

  it('should return carteInvalidite', function(done) {
    var answers = {
      vie_quotidienne: {
        "pensionInvalidite": {
          "mtp": true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(carteInvalidite);
    done();
  });

});


