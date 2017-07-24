'use strict';

import should from 'should';
import { spy } from 'sinon';
import proxyquire from 'proxyquire';

const sendMailNotificationAgentSpy = spy();
const Dispatcher = proxyquire('./dispatcher', {
  '../api/send-mail/send-mail-actions': {
    sendMailNotificationAgent: sendMailNotificationAgentSpy
  }
});

import Secteur from '../api/secteur/secteur.model';
import Mdph from '../api/mdph/mdph.model';
import Request from '../api/request/request.model';
import User from '../api/user/user.model';

const mdphCaen = new Mdph({
  name: 'Caen',
  zipcode: '14',
  email: 'caen@caen.com'
});

const secteurCaen = new Secteur({
  mdph: mdphCaen,
  name: 'Secteur Caen',
  communes: ['14000']
});

const secteurHerouville = new Secteur({
  mdph: mdphCaen,
  name: 'Secteur Hérouville',
  communes: ['14100']
});

describe('Dispatcher', function() {
  before(done => {
    // Clean mongo
    Secteur.remove()
      .then(() => User.remove())
      .then(() => Mdph.remove())
      .then(() => done());
  });

  before(done => {
    mdphCaen.save()
      .then(() => done());
  });

  before(done => {
    secteurHerouville.save()
      .then(() => secteurCaen.save())
      .then(() => done());
  });

  before(done => {
    const evaluatorAdulteHerouville = new User({
      name: 'Evaluator adulte',
      mdph: mdphCaen._id,
      role: 'adminMdph',
      email: 'test@toto.com',
      password: 'password',
      secteurs: [
        secteurHerouville.id,
      ],
      specialisation: {
        adulte: true,
        enfant: false
      }
    });

    const evaluatorEnfantHerouville = new User({
      name: 'Evaluator enfant',
      mdph: mdphCaen._id,
      role: 'adminMdph',
      email: 'test@tata.com',
      password: 'password',
      secteurs: [
        secteurHerouville.id,
      ],
      specialisation: {
        adulte: false,
        enfant: true
      }
    });

    evaluatorAdulteHerouville.save()
      .then(() => evaluatorEnfantHerouville.save())
      .then(() => done());
  });

  it('should find the correct mdph', function(done) {
    const user = new User();
    const request = new Request({
      mdph: '14',
      user: user._id,
      formAnswers: {
        identites: {
          beneficiaire: {
            code_postal: '14100',
            dateNaissance: Date.now() + ''
          }
        }
      }
    });

    Dispatcher.findRequestMdph(request).then(({mdph}) => {
      should.exist(mdph);
      mdph.id.should.be.exactly(mdphCaen.id);
      done();
    });
  });

  it('should find the correct secteur', function(done) {
    const user = new User();
    const request = new Request({
      mdph: '14',
      user: user._id,
      formAnswers: {
        identites: {
          beneficiaire: {
            code_postal: '14100',
            dateNaissance: Date.now() + ''
          }
        }
      }
    });

    Dispatcher.findSecteur({request, mdphCaen}).then(({secteurs}) => {
      should.exist(secteurs);
      secteurs.length.should.be.exactly(1);
      secteurs[0].id.should.be.exactly(secteurHerouville.id);
      done();
    });
  });

  it('should find the correct evaluators to notify (child)', function(done) {
    const user = new User();
    const request = new Request({
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
    const secteurs = [];
    secteurs.push(secteurHerouville);
    const mdph = mdphCaen;

    Dispatcher.findEvaluators({request, mdph, secteurs}).then(function({evaluators}) {
      should.exist(evaluators);
      evaluators.length.should.be.exactly(1);
      evaluators[0].name.should.be.exactly('Evaluator enfant');
      done();
    });
  });

  it.only('should correctly dispatch the request', function(done) {
    const user = new User();
    const request = new Request({
      mdph: '14',
      user: user._id,
      formAnswers: {
        identites: {
          beneficiaire: {
            code_postal: '14100',
            dateNaissance: Date.now() + ''
          }
        }
      }
    });

    Dispatcher.dispatch(request).then(function(request) {
      should.exist(request);
      request.evaluators.length.should.be.exactly(1);
      request.evaluators[0].name.should.be.exactly('Evaluator enfant');
      sendMailNotificationAgentSpy.callCount.should.be.exactly(1);
      sendMailNotificationAgentSpy.lastCall.args[1].should.be.exactly('test@tata.com');
      done();
    });
  });
});
