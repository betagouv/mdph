'use strict';

var should = require('should');
var async = require('async');

var dispatcher = require('./dispatcher');

var DispatchRule = require('../api/dispatch-rule/dispatch-rule.model');
var Secteur = require('../api/secteur/secteur.model');
var Mdph = require('../api/mdph/mdph.model');

var caen = new Mdph({
  name: 'Caen',
  zipcode: '14',
  email: 'caen@caen.com'
});

var nord = new Mdph({
  name: 'Nord',
  zipcode: '59',
  email: 'nord@nord.com'
});

var secteurNord = new Secteur({
  mdph: nord,
  name: 'Secteur Nord A',
  default: true
});

var secteurCaen = new Secteur({
  mdph: caen,
  name: 'Secteur Caen'
});

var secteurHerouville = new Secteur({
  mdph: caen,
  name: 'Secteur Hérouville'
});

var ruleCaen = new DispatchRule({
  mdph: caen,
  name: 'Regle Caen',
  commune: {
    nom: 'Caen',
    codePostal: '14000'
  },
  secteur: {
    enfant: secteurCaen,
    adulte: secteurHerouville
  }
});

var ruleHerouville = new DispatchRule({
  mdph: caen,
  name: 'Regle Hérouville',
  commune: {
    nom: 'Hérouville',
    codePostal: '14100'
  },
  secteur: {
    enfant: secteurCaen,
    adulte: secteurHerouville
  }
});

describe('Dispatcher', function() {
  before(function(done) {
    // Init mongo
    async.series([
      function(callback) {
        DispatchRule.remove().exec(callback);
      },

      function(callback) {
        Secteur.remove().exec(callback);
      },

      function(callback) {
        Mdph.remove().exec(callback);
      },

      function(callback) {
        caen.save(callback);
      },

      function(callback) {
        nord.save(callback);
      },

      function(callback) {
        secteurNord.save(callback);
      },

      function(callback) {
        secteurCaen.save(callback);
      },

      function(callback) {
        secteurHerouville.save(callback);
      },

      function(callback) {
        ruleHerouville.save(callback);
      },

      function(callback) {
        ruleCaen.save(callback);
      }

    ], function(err, results) {
      done();
    });
  });

  it('should find the correct secteur', function(done) {
    var request = {
      mdph: '14',
      formAnswers: {
        identites: {
          beneficiaire: {
            code_postal: '14000',
            dateNaissance: Date.now() + ''
          }
        }
      }
    };

    dispatcher.findSecteur(request, function(secteur) {
      should.exist(secteur);
      secteur.id.should.be.exactly(secteurCaen.id);
      done();
    });
  });

  it('should find the correct default secteur even without rules', function(done) {
    var request = {
      mdph: '59',
      formAnswers: {
        identites: {
          beneficiaire: {
            code_postal: '59000',
            dateNaissance: Date.now() + ''
          }
        }
      }
    };

    dispatcher.findSecteur(request, function(secteur) {
      should.exist(secteur);
      secteur.id.should.be.exactly(secteurNord.id);
      done();
    });
  });

  it('should not find the default secteur if it is described in another mdph', function(done) {
    var request = {
      mdph: '14',
      formAnswers: {
        identites: {
          beneficiaire: {
            code_postal: '14666',
            dateNaissance: Date.now() + ''
          }
        }
      }
    };

    dispatcher.findSecteur(request, function(secteur) {
      should.not.exist(secteur);
      done();
    });
  });
});
