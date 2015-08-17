'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestations.json');

var aeeh = prestations[2];

describe('Simulation prestations : AEEH ', function() {

  it('should return aeeh', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2002-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        attentesTypeAide: {
          financierMinimum: true,
          humain: true
        },
        besoinsVie: {
          hygiene: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aeeh);
    done();
  });

  it('should return aeeh, renouvellement', function(done) {
    var answers = {
      vie_quotidienne: {
        aideFinancierePresent: {
          aeeh: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aeeh);
    done();
  });

  it('should not return aeeh', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2002-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        attentesTypeAide: {
          financierMinimum: true,
          humain: false
        },
        besoinsVie: {
          hygiene: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(aeeh);
    done();
  });

  it('should not return aeeh, too old', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        attentesTypeAide: {
          financierMinimum: true,
          humain: false
        },
        besoinsVie: {
          hygiene: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(aeeh);
    done();
  });

  it('should return aeeh', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2002-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        attentesTypeAide: {
          financierMinimum: true,
          materiel: true,
          humain: true
        },
        besoinsVie: {
          hygiene: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aeeh);
    done();
  });

  it('should return aeeh', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2002-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        attentesTypeAide: {
          financierMinimum: true,
          amenagement: true,
          humain: true
        },
        besoinsVie: {
          hygiene: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aeeh);
    done();
  });

  it('should return aeeh', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2002-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        attentesTypeAide: {
          amenagement: true,
          materiel: true
        },
        besoinsVie: {
          hygiene: true,
          habits: true,
          repas: true
        },
        besoinsDeplacement: {
          public: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aeeh);
    done();
  });
});
