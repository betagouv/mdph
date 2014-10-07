/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Mdph = require('../api/mdph/mdph.model');
var Form = require('../api/form/form.model');
var async = require('async');

var mdphNord, mdphCalvados, admin, foo, bar, alice, bob;


var deleteUsers = function(cb) {
  User.find({}).remove(function() {
    console.log('finished deleting users');
    cb();
  });
};

var deleteForms = function(cb) {
  Form.find({}).remove(function() {
    console.log('finished deleting forms');
    cb();
  });
};

var deleteMdphs = function(cb) {
  Mdph.find({}).remove(function(err) {
    console.log('finished deleting mdphs');
    cb();
  });
};

var createMdphNord = function(cb) {
  Mdph.create({
    name: 'Nord',
    zipcode: '59'
  }, function(err, data) {
    mdphNord = data;
    cb();
  });
};

var createMdphCalvados = function(cb) {
  Mdph.create({
    name: 'Calvados',
    zipcode: '14'
  }, function(err, data) {
    mdphCalvados = data;
    cb();
  });
};

var createBar = function(cb) {
  User.create({
    provider: 'local',
    role: 'adminMdph',
    name: 'Bar',
    email: 'bar@bar.com',
    password: 'bar',
    mdph: mdphNord
  }, function(err, data) {
    bar = data;
    cb();
  });
};

var createFoo = function(cb) {
  User.create({
    provider: 'local',
    name: 'Foo',
    email: 'foo@foo.com',
    password: 'foo',
    mdph: mdphNord
  }, function(err, data) {
    foo = data;
    cb();
  });
};

var createBob = function(cb) {
  User.create({
    provider: 'local',
    name: 'Bob',
    email: 'bob@bob.com',
    password: 'bob',
    mdph: mdphCalvados
  }, function(err, data) {
    bob = data;
    cb();
  });
};

var createAdmin = function(cb) {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function(err, data) {
    admin = data;
    cb();
  });
};

var createAlice = function(cb) {
  User.create({
    provider: 'local',
    role: 'adminMdph',
    name: 'Alice',
    email: 'alice@alice.com',
    password: 'alice',
    mdph: mdphCalvados
  }, function(err, data) {
    alice = data;
    cb();
  });
};

var createFooForm = function(cb) {
  Form.create({
    user: foo,
    formAnswers: {},
    updatedAt: new Date(),
    step: 'obligatoire'
  });
};

var createBobForm = function(cb) {
  Form.create({
    user: bob,
    formAnswers: {
      'contexte': {
        'estRepresentant':true,
        'demandeur': {
           'prenom':'Bobby',
           'sexe':'masculin'
        },
        'mdph': mdphCalvados,
        'nouveauDossier':false,
        'numDossier':true,
        'numeroDossier':'21',
        'raison': {
           'finDeVosDroits':true
        },
        'connaisTaux':true,
        'tauxIncapacite':79,
        'contestationTaux':'stable',
        'dateNaissance':'1981-05-12T22:00:00.000Z',
        'urgences': {
           'domicile':false,
           'formation':true
        },
        'formationDetail':'2014-10-21T22:00:00.000Z'
      },
      'vieQuotidienne': {
        'famille':'parents',
        'logement':'independant',
        'logement_independant':'proprietaire',
        'mesPrestations':[
           {
              'id':'aah',
              'label':'AAH',
              'date':'2014-09-08T22:00:00.000Z',
              'type':'presta-finances',
              'description':'L\'allocation aux adultes handicapés (AAH) est versée, sous conditions de ressources, aux adultes déclarés handicapés afin de leur assurer un revenu minimum.'
           }
        ],
        'besoinsVie': {
           'courses':true,
           'habits':true,
           'budget':true,
           'courant':true,
           'repas':true,
           'menage':true
        },
        'besoinsDeplacement': {
           'intraDomicile':true,
           'public':true,
           'transports':true,
           'vacances':true
        },
        'besoinsSocial': {
           'communication':true,
           'proches':true,
           'securite':true,
           'citoyen':true
        },
        'besoinsLieuDeVie': {
           'materiel':true,
           'conduite':true
        },
        'attentesTypeAide': {
           'domicile':true,
           'amenagement':true,
           'financierHandicap':true,
           'mobilite':true,
           'etablissement':true,
           'materiel':true
        },
        'structures': {
           'valeur':false,
           'structures':[
              {
                 'name':'',
                 'contact':false
              }
           ]
        },
        'autresRenseignements':'',
        'objetDemande': {
           'travail':false
        }
      },
      'aidant': {
        'sectionLabel':'Aidant familial',
        'answers': {
           'condition':false
        }
      },
      'envoi':true
    },
    updatedAt: new Date(),
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'a_valider',
        files: [
          { name: 'certificatMedical', state: 'telecharge', path: 'test' },
          { name: 'carteIdentite', state: 'telecharge', path: 'test2' }
        ]
      }
    ]
  });
};

async.series([
  deleteUsers,
  deleteForms,
  deleteMdphs,

  createMdphNord,
  createMdphCalvados,

  createFoo,
  createBar,
  createAlice,
  createBob,
  createAdmin,

  createBobForm,
  createFooForm
]);
