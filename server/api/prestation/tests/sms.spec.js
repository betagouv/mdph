'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestations.json');

var sms = prestations[10];

describe('Simulation prestations : sms ', function() {

  it('should return sms', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1979-05-06T22:00:00.000Z'
        }
      },
      situations_particulieres: {
        urgences: {
          domicile: true
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          budget: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(sms);
    done();
  });

  it('should not return sms', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1979-05-06T22:00:00.000Z'
        }
      },
      situations_particulieres: {
        urgences: {
          domicile: true
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          budget: false
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(sms);
    done();
  });

  it('should return sms', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1979-05-06T22:00:00.000Z'
        }
      },
      aidant: {
        natureAide: {
          surveillance: true,
          deplacementExterieur: true,
          repasPreparation: true,
          social: true,
          loisirs: true,
          logement: true,
          finances: true,
          juridique: true,
          medical: true
        },
        typeAttente: {
          repos: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(sms);
    done();
  });

});
