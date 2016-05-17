'use strict';

import should from 'should';
import async from 'async';

import Dispatcher from './dispatcher';

import DispatchRule from '../api/dispatch-rule/dispatch-rule.model';
import Secteur from '../api/secteur/secteur.model';
import Mdph from '../api/mdph/mdph.model';
import Request from '../api/request/request.model';
import User from '../api/user/user.model';

var nord = new Mdph({
  name: 'Nord',
  zipcode: '59',
  email: 'nord@nord.com'
});

var caen = new Mdph({
  name: 'Caen',
  zipcode: '14',
  email: 'caen@caen.com'
});

var agentAdulte = new User({
  name: 'Agent adulte',
  mdph: nord._id,
  email: 'test@toto.com',
  password: 'password'
});

var agentEnfant = new User({
  name: 'Agent enfant',
  mdph: nord._id,
  email: 'test@tata.com',
  password: 'password'
});

var secteurNord = new Secteur({
  mdph: nord,
  name: 'Secteur Nord A',
  default: true,
  evaluators: {
    adulte: agentAdulte._id,
    enfant: agentEnfant._id
  }
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
        User.remove().exec(callback);
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
        agentAdulte.save(callback);
      },

      function(callback) {
        agentEnfant.save(callback);
      },

      function(callback) {
        secteurNord.save(callback);
      },

      function(callback) {
        secteurCaen.save((err, saved) => {
          secteurCaen = saved;
          callback();
        });
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
      done(err);
    });
  });

  it('should find the correct secteur', function(done) {
    var user = new User();
    var request = new Request({
      mdph: '14',
      user: user._id,
      formAnswers: {
        identites: {
          beneficiaire: {
            code_postal: '14000',
            dateNaissance: Date.now() + ''
          }
        }
      }
    });

    Dispatcher.dispatch(request).then(function(secteur) {
      should.exist(secteur);
      secteur.id.should.be.exactly(secteurCaen.id);
      done();
    });
  });

  it('should find the correct default secteur even without rules', function(done) {
    var user = new User();
    var request = new Request({
      mdph: '59',
      user: user._id,
      formAnswers: {
        identites: {
          beneficiaire: {
            code_postal: '59000',
            dateNaissance: Date.now() + ''
          }
        }
      }
    });

    Dispatcher.dispatch(request).then(function(secteur) {
      should.exist(secteur);
      secteur.id.should.be.exactly(secteurNord.id);
      done();
    });
  });

  it('should not find the default secteur if it is described in another mdph', function(done) {
    var user = new User();
    var request = new Request({
      mdph: '14',
      user: user._id,
      formAnswers: {
        identites: {
          beneficiaire: {
            code_postal: '14666',
            dateNaissance: Date.now() + ''
          }
        }
      }
    });

    Dispatcher.dispatch(request).catch(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should find the default secteur and notify evaluator', function(done) {
    var user = new User();
    var request = new Request({
      mdph: '59',
      user: user._id,
      formAnswers: {
        identites: {
          beneficiaire: {
            code_postal: '59000',
            dateNaissance: Date.now() + ''
          }
        }
      }
    });

    Dispatcher.dispatch(request).then(function(secteur) {
      should.exist(secteur);
      done();
    });
  });
});
