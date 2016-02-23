'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestations.json');

var orp = _.indexBy(prestations, 'id').orp;

describe('Simulation prestations : orp ', function() {

  it('should return orp', function(done) {
    var answers = {
      situations_particulieres: {
        urgences: {
          travail: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(orp);
    done();
  });

  it('should return orp', function(done) {
    var answers = {
      situations_particulieres: {
        urgences: {
          formation: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(orp);
    done();
  });

  it('should return orp', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      situations_particulieres: {
        urgences: {
          formation: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(orp);
    done();
  });

  it('should return orp', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2000-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          courant: true
        },
        pensionInvalidite: {
          mtp: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(orp);
    done();
  });

  it('should return orp', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2000-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          courant: true,
          hygiene: true,
          habits: true,
          repas: true,
        },
        attentesTypeAide: {
          materiel: true
        },
        besoinsDeplacement: {
          public: true
        }
      },
      vie_au_travail: {
        conditionTravail: true,
        temps: false,
        adapte: false
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(orp);
    done();
  });

  it('should not return orp', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2000-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          courant: true,
          hygiene: true,
          habits: true,
          repas: true
        },
        attentesTypeAide: {
          materiel: true
        },
        besoinsDeplacement: {
          public: true
        }
      },
      vie_au_travail: {
        conditionTravail: true,
        temps: false,
        adapte: true
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(orp);
    done();
  });

  it('should return orp', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2000-05-06T22:00:00.000Z'
        }
      },
      vie_au_travail: {
        rqth: true
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(orp);
    done();
  });
});
