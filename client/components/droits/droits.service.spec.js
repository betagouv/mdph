'use strict';

/* global _ */

describe('Service: droits', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var service;
  var constants;
  beforeEach(inject(function (DroitService, droits) {
    service = DroitService;
    constants = droits;
  }));

  it('should return an empty array when called on an empty form', function () {
    // given
    var answers = {contexte: {}};

    // when
    var result = service.compute(answers);

    // then
    expect(result).toEqual([]);
  });

  it('should return aaeh', function () {
    // given
    var answers = {
      contexte: {
        // Renouvellement taux > 70 et non conteste
        nouveauDossier: false,
        connaisTaux: true,
        tauxIncapacite: 51,
        contestationTaux: 'stable',
        // Age > 20 ans
        dateNaissance: new Date(2003,11,7)
      },
      vieQuotidienne: {
        // Besoin d’aide pour l’hygiène corporelle
        besoinsVie: {
          hygiene: true
        },
        // Attente d’une aide financière pour des dépenses liées à votre handicap
        attentesTypeAide: {
          financierHandicap: true
        }
      }
    };

    // when
    var result = service.compute(answers);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('aeeh');
  });

  it('should return aaeh', function () {
    // given
    var answers = {
      contexte: {
        // Renouvellement taux > 70 et non conteste
        nouveauDossier: false,
        connaisTaux: true,
        tauxIncapacite: 51,
        contestationTaux: 'aggrave',
        // Age > 20 ans
        dateNaissance: new Date(2003,11,7)
      },
      vieQuotidienne: {
        // Besoin d’aide pour l’hygiène corporelle
        besoinsVie: {
          hygiene: true
        },
        // Attente d’une aide financière pour des dépenses liées à votre handicap
        attentesTypeAide: {
          financierHandicap: true
        }
      }
    };

    // when
    var result = service.compute(answers);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('aeeh');
  });

  it('should return aaeh', function () {
    // given
    var answers = {
      contexte: {
        // Renouvellement taux > 70 et non conteste
        nouveauDossier: false,
        connaisTaux: true,
        tauxIncapacite: 49,
        contestationTaux: 'aggrave',
        // Age > 20 ans
        dateNaissance: new Date(2003,11,7)
      },
      vieQuotidienne: {
        // Besoin d’aide pour l’hygiène corporelle
        besoinsVie: {
          hygiene: true
        },
        // Attente d’une aide financière pour des dépenses liées à votre handicap
        attentesTypeAide: {
          financierHandicap: true
        }
      }
    };

    // when
    var result = service.compute(answers);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).toContain('aeeh');
  });

  it('should not return aaeh', function () {
    // given
    var answers = {
      contexte: {
        // Renouvellement taux > 70 et non conteste
        nouveauDossier: false,
        connaisTaux: true,
        tauxIncapacite: 51,
        contestationTaux: 'ameliore',
        // Age > 20 ans
        dateNaissance: new Date(2003,11,7)
      },
      vieQuotidienne: {
        // Besoin d’aide pour l’hygiène corporelle
        besoinsVie: {
          hygiene: true
        },
        // Attente d’une aide financière pour des dépenses liées à votre handicap
        attentesTypeAide: {
          financierHandicap: true
        }
      }
    };

    // when
    var result = service.compute(answers);
    var idResult = _.pluck(result, 'id');

    // then
    expect(idResult).not.toContain('aeeh');
  });
});
