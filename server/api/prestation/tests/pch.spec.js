'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestations.json');

var pch = _.indexBy(prestations, 'id').pch;

describe('Simulation prestations : pch ', function() {

  it('should return pch - more than 76', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1912-05-06T22:00:00.000Z'
        }
      },
      vie_au_travail: {
        conditionTravail: true
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(pch);
    done();
  });

  it('should not return pch - more than 76', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1912-05-06T22:00:00.000Z'
        }
      },
      vie_au_travail: {
        conditionTravail: false
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(pch);
    done();
  });

  it('should return pch - more than 20 less than 76', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1987-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        aideTechnique: {
          aideTechnique_vehicule: true
        },
        pensionInvalidite: {
          pcrtp: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(pch);
    done();
  });

  it('should return pch - less than 20', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2009-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        attentesTypeAide: {
          humain: true
        },
        besoinsVie: {
          repas: true,
          hygiene: true
        },
        aideTechnique: {
          aideTechnique_vehicule: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(pch);
    done();
  });

  it('should return pch - less than 20', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2009-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        attentesTypeAide: {
          humain: true
        },
        besoinsVie: {
          habits: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(pch);
    done();
  });

  it('should return pch - less than 20 and already have one', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2009-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        aideFinancierePresent: {
          pch_enfant: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(pch);
    done();
  });

  it('should not return pch - less than 20', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2009-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          habits: true,
          repas: true
        },
        besoinsSocial: {
          securite: true,
          proches: true,
          communication: true
        },
        besoinsDeplacement: {
          intraDomicile: true,
          public: true,
          accesDomicile: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(pch);
    done();
  });

  it('should return pch - less than 20', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2009-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          sante: true,
          courses: true,
          menage: true,
          cuisine: true,
          budget: true
        },
        besoinsSocial: {
          securite: true,
          proches: true,
          citoyen: true,
          loisirs: true
        },
        attentesTypeAide: {
          financierHandicap: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(pch);
    done();
  });

  it('should return pch - less than 20', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '2009-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          habits: true,
          repas: true,
          hygiene: true
        },
        besoinsDeplacement: {
          public: true
        },
        attentesTypeAide: {
          materiel: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(pch);
    done();
  });
});
