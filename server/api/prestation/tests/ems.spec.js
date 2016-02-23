'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestations.json');

var ems = _.indexBy(prestations, 'id').ems;

describe('Simulation prestations : ems ', function() {

  it('should return ems', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        attentesTypeAide: {
          etablissement: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(ems);
    done();
  });

  it('should not return ems', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2002-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        attentesTypeAide: {
          etablissement: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(ems);
    done();
  });

  it('should return ems', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      situations_particulieres: {
        urgences: {
          domicile: true
        }
      },
      vie_quotidienne: {
        besoinsSocial: {
          securite: true,
          proches: true,
          loisirs: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(ems);
    done();
  });

  it('should return ems', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      aidant: {
        natureAide: {
          surveillance: true,
          deplacementInterieur: true,
          deplacementExterieur: true,
          repasPrise: true,
          social: true,
          loisirs: true,
          hygiene: true
        },
        typeAttente: {
          professionnel: true,
          vacances: true,
          imprevu: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(ems);
    done();
  });

  it('should not return ems', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      aidant: {
        natureAide: {
          surveillance: true,
          deplacementInterieur: true,
          deplacementExterieur: true,
          repasPrise: true,
          social: true,
          loisirs: true,
          hygiene: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(ems);
    done();
  });

  it('should not return ems', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      aidant: {
        typeAttente: {
          professionnel: true,
          vacances: true,
          imprevu: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(ems);
    done();
  });

  it('should return ems', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      aidant: {
        natureAide: {
          deplacementExterieur: true
        },
        typeAttente: {
          imprevu: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(ems);
    done();
  });
});
