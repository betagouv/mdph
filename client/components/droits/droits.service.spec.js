'use strict';

/* global _ */

/*
describe('Service: droits || AEEH || ', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var service;
  var constants;
  beforeEach(inject(function (DroitService) {
    service = DroitService;
    constants = [
      {
        id: 'aeeh'
      }
    ];
  }));

  it('should return aeeh', function () {
    // given
    var answers = {
      contexte: {
        nouveauDossier: false,
        connaisTaux: true,
        tauxIncapacite: 51,
        contestationTaux: 'stable',
        // Age < 20 ans
        dateNaissance: new Date(2003,11,7)
      },
      vieQuotidienne: {
        besoinsVie: {
          hygiene: true,
          habits: true
        },
        attentesTypeAide: {
          financierHandicap: true
        }
      }
    };

    // when
    var result = service.compute(answers, constants);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('aeeh');
  });

  it('should return aeeh', function () {
    // given
    var answers = {
      contexte: {
        nouveauDossier: false,
        connaisTaux: true,
        tauxIncapacite: 51,
        contestationTaux: 'aggrave',
        // Age < 20 ans
        dateNaissance: new Date(2003,11,7)
      },
      vieQuotidienne: {
        besoinsVie: {
          hygiene: true
        },
        attentesTypeAide: {
          financierHandicap: true
        }
      }
    };

    // when
    var result = service.compute(answers, constants);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('aeeh');
  });

  it('should return aeeh', function () {
    // given
    var answers = {
      contexte: {
        nouveauDossier: false,
        connaisTaux: true,
        tauxIncapacite: 49,
        contestationTaux: 'aggrave',
        // Age < 20 ans
        dateNaissance: new Date(2003,11,7)
      },
      vieQuotidienne: {
        besoinsVie: {
          hygiene: true
        },
        attentesTypeAide: {
          financierHandicap: true
        }
      }
    };

    // when
    var result = service.compute(answers, constants);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('aeeh');
  });


  it('should return aeeh', function () {
    // given
    var answers = {
      contexte: {
        // Age < 20 ans
        dateNaissance: new Date(2003,11,7)
      },
      vieQuotidienne: {
        besoinsSocial: {
          securite: true,
          loisirs: true,
          citoyen: true
        },
        besoinsVie: {
          budget: true,
          courses: true,
          cuisine: true,
          menage: true,
          sante: true
        },
        // Attente d’une aide financière pour des dépenses liées à votre handicap
        attentesTypeAide: {
          financierHandicap: true
        }
      }
    };

    // when
    var result = service.compute(answers, constants);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('aeeh');
  });


  it('should not return aeeh', function () {
    // given
    var answers = {
      contexte: {
        // Age < 20 ans
        dateNaissance: new Date(2003,11,7)
      },
      vieQuotidienne: {
        besoinsSocial: {
          securite: true,
          loisirs: true,
          citoyen: true
        },
        besoinsVie: {
          budget: true,
          courses: false,
          cuisine: true,
          menage: true,
          sante: true
        },
        // Attente d’une aide financière pour des dépenses liées à votre handicap
        attentesTypeAide: {
          financierHandicap: true
        }
      }
    };

    // when
    var result = service.compute(answers, constants);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).not.toContain('aeeh');
  });
});

describe('Service: droits || AAH || ', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var service;
  var constants;
  beforeEach(inject(function (DroitService) {
    service = DroitService;
    constants = [
      {
        id: 'aah'
      }
    ];
  }));

  describe('Premiere attribution || ', function () {

    it('should not return aah because the user is a child', function () {
      // given
      var answers = {
        contexte: {
          // Age < 20 ans
          dateNaissance: new Date(2003,11,7)
        },
        vieQuotidienne: {
          besoinsSocial: {
            securite: true,
            loisirs: true,
            citoyen: true
          },
          besoinsVie: {
            budget: true,
            courses: false,
            cuisine: true,
            menage: true,
            sante: true
          },
          // Attente d’une aide financière pour des dépenses liées à votre handicap
          attentesTypeAide: {
            financierHandicap: true
          }
        }
      };

      // when
      var result = service.compute(answers, constants);
      var idResult = _.pluck(result, 'id');

      // then
      expect(idResult).not.toContain('aah');
    });
  });


  it('should return aah', function () {
    // given
    var answers = {
      contexte: {
        dateNaissance: new Date(1973,11,7)
      },
      vieQuotidienne: {
        besoinsVie: {
          courant: true,
          hygiene: true
        },
        attentesTypeAide: {
          humain: true
        }
      }
    };

    // when
    var result = service.compute(answers, constants);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('aah');
  });

  it('should return aah', function () {
    // given
    var answers = {
      contexte: {
        dateNaissance: new Date(1983,11,7)
      },
      vieQuotidienne: {
        besoinsSocial: {
          proche: true,
          loisirs: true,
          citoyen: true,
          securite: true
        },
        besoinsVie:{
          courant: true,
          budget: true,
          courses: true,
          cuisine: true,
          menage: true,
          sante: true
        }
      },
      travail: {
        conditionTravail: true
      }
    };

    // when
    var result = service.compute(answers, constants);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('aah');
  });


  it('should return aah', function () {
    // given
    var answers = {
      contexte: {
        // Age < 20 ans
        dateNaissance: new Date(1973,11,7)
      },
      vieQuotidienne: {
        besoinsSocial: {
          securite: true,
          loisirs: true,
          citoyen: true
        },
        besoinsVie: {
          courant: true,
          budget: true,
          courses: true,
          cuisine: true,
          menage: true,
          sante: true
        }
      }
    };

    // when
    var result = service.compute(answers, constants);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('aah');
  });
});


describe('Service: droits || Renouvellements || ', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var service;
  var constants;
  beforeEach(inject(function (DroitService) {
    service = DroitService;
    constants = [
      {
        id: 'aah'
      },
      {
        id: 'ac'
      },
      {
        id: 'pch'
      }
    ];
  }));

  it('should return renouvellement of aah', function () {
    // given
    var answers = {
      prestations: {
        'aah': {
          date: '2014-09-08'
        }
      }
    };

    // when
    var result = service.compute(answers, constants);

    // then
    expect(result.length).toBe(1);
    var expectedResult = result[0];
    expect(expectedResult.renouvellement).toBe(true);
    expect(expectedResult.descRenouvellement).toBe('* Etude du renouvellement de votre droit se terminant le 08/09/2014.');
  });


  it('should return renouvellement of pch and aah', function () {
    // given
    var answers = {
      prestations: {
        'ac': {
          date:'2014-09-08'
        }
      }
    };

    // when
    var result = service.compute(answers, constants);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('pch');
    expect(idResult).toContain('ac');
  });
});
*/

