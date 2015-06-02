'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestations.json');

var ac = prestations[11];

describe('Simulation prestations : AC ', function() {

  it('should return ac - renouvellement de droit', function(done) {
    var answers = {
      estRenouvellement: true,
      "prestations": {
        "ac": {
          "date": "2015-05-11T22:00:00.000Z"
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(ac);
    done();
  });

});
