'use strict';

var should = require('should');
var _ = require('lodash');

var controller = require('../prestation.controller');
var prestations = require('../prestations.json');

var aah = _.indexBy(prestations, 'id').aah;

describe('Simulation prestations : AAH ', function() {

  it('should not return aah', function(done) {
    var answers = {
      vie_quotidienne: {
        besoinsVie: {
          courant: false
        },
        attentesTypeAide: {
          financierMinimum: false
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.have.length(0);
    done();
  });

  it('should return aah', function(done) {
    var answers = {
      vie_quotidienne: {
        attentesTypeAide: {
          financierMinimum: true
        },
        pensionInvalidite: {
          mtp: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aah);
    done();
  });

  it('should return aah', function(done) {
    var answers = {
      vie_quotidienne: {
        besoinsVie: {
          courant: true
        },
        pensionInvalidite: {
          pcrtp: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aah);
    done();
  });

  it('should return aah', function(done) {
    var answers = {
      vie_quotidienne: {
        besoinsVie: {
          courant: true,
          hygiene: true
        },
        attentesTypeAide: {
          humain: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aah);
    done();
  });

  it('should return aah', function(done) {
    var answers = {
      vie_quotidienne: {
        besoinsVie: {
          courant: true,
          habits: true
        },
        attentesTypeAide: {
          humain: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aah);
    done();
  });

  it('should return aah', function(done) {
    var answers = {
      vie_quotidienne: {
        besoinsVie: {
          courant: true,
        },
        besoinsDeplacement: {
          intraDomicile: true
        },
        attentesTypeAide: {
          humain: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aah);
    done();
  });

  it('should not return aah', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          courant: true,
          habits: true,
          cuisine: true,
          repas: true,
          budget: true,
          courses: true,
          menage: true,
          sante: true
        },
        besoinsSocial: {
          securite: true,
          proches: true,
          loisirs: false,
          citoyen: true
        }
      },
      vie_au_travail: {
        conditionTravail: false
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(aah);
    done();
  });

  it('should return aah', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          courant: true,
          habits: true,
          cuisine: true,
          repas: true,
          budget: true,
          courses: true,
          menage: true,
          sante: true
        },
        besoinsSocial: {
          securite: true,
          proches: true,
          loisirs: true,
          citoyen: true
        }
      },
      vie_au_travail: {
        conditionTravail: false
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aah);
    done();
  });

  it('should not return aah - more than 62 yrs old', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1912-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          courant: true,
          habits: true,
          cuisine: true,
          repas: true,
          budget: true,
          courses: true,
          menage: true,
          sante: true
        },
        besoinsSocial: {
          securite: true,
          proches: true,
          loisirs: true,
          citoyen: true
        }
      },
      vie_au_travail: {
        conditionTravail: false
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(aah);
    done();
  });

  it('should return aah', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          courant: true,
          habits: true,
          cuisine: true,
          repas: true,
          budget: true,
          courses: true,
          menage: true,
          sante: true
        },
        besoinsSocial: {
          securite: true,
          proches: true,
          loisirs: true,
          citoyen: true
        }
      },
      vie_au_travail: {
        conditionTravail: true,
        temps: false,
        adapte: false
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aah);
    done();
  });

  it('should not return aah', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          courant: true,
          habits: true,
          cuisine: true,
          repas: true,
          budget: true,
          courses: true,
          menage: true,
          sante: true
        },
        besoinsSocial: {
          securite: true,
          proches: true,
          loisirs: true,
          citoyen: true
        }
      },
      vie_au_travail: {
        conditionTravail: true,
        temps: true,
        adapte: false
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(aah);
    done();
  });

  it('should return aah', function(done) {
    var answers = {
      identites: {
        beneficiaire: {
          dateNaissance: '1992-05-06T22:00:00.000Z'
        }
      },
      vie_quotidienne: {
        besoinsVie: {
          hygiene: true,
          courant: true,
          habits: true,
          repas: true,
          sante: true
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
    quitus.should.containEql(aah);
    done();
  });

  it('should return aah - renouvellement de droit', function(done) {
    var answers = {
      vie_quotidienne: {
        aideFinancierePresent: {
          aah: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aah);
    done();
  });

  it('should return aah - milieu de travail protégé', function(done) {
    var answers = {
      beneficiaire: {
        dateNaissance: '1992-05-06T22:00:00.000Z'
      },
      vie_au_travail: {
        milieuTravail: {
          etablissement: true
        }
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aah);
    done();
  });

  it('should not return aah - milieu de travail protégé', function(done) {
    var answers = {
      estRenouvellement: false,
      beneficiaire: {
        dateNaissance: '1992-05-06T22:00:00.000Z'
      },
      vie_au_travail: {
        milieuTravail: 'etablissement'
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(aah);
    done();
  });

  it('should not return aah - milieu de travail protégé', function(done) {
    var answers = {
      estRenouvellement: true,
      beneficiaire: {
        dateNaissance: '1992-05-06T22:00:00.000Z'
      },
      vie_au_travail: {
        milieuTravail: 'autre'
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.not.containEql(aah);
    done();
  });

  it('should return aah - etablissement medico social', function(done) {
    var answers = {
      estRenouvellement: true,
      beneficiaire: {
        dateNaissance: '1992-05-06T22:00:00.000Z'
      },
      vie_quotidienne: {
        logement: 'etablissement'
      }
    };

    var quitus = controller.simulate(answers);
    quitus.should.containEql(aah);
    done();
  });
});
