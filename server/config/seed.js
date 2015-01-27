/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Mdph = require('../api/mdph/mdph.model');
var Partenaire = require('../api/partenaire/partenaire.model');
var Request = require('../api/request/request.model');
var Notification = require('../api/notification/notification.model');
var async = require('async');

var mdphNord, mdphCalvados,
    admin, foo, nord, bar, alice, bob, martin, rox, sophie, jeanne, francoise, arnaud, emma, jerome, ella, tanguy, pierre, thibault, florian,
    bobRequest, fooRequest, francoiseRequest, emmaRequest,
    notifBob;

var deletePartenaires = function(cb) {
  Partenaire.find({}).remove(function() {
    console.log('finished deleting partenaires');
    cb();
  });
};

var deleteUsers = function(cb) {
  User.find({}).remove(function() {
    console.log('finished deleting users');
    cb();
  });
};

var deleteRequests = function(cb) {
  Request.find({}).remove(function() {
    console.log('finished deleting requests');
    cb();
  });
};

var deleteMdphs = function(cb) {
  Mdph.find({}).remove(function() {
    console.log('finished deleting mdphs');
    cb();
  });
};

var deleteNotifications = function(cb) {
  Notification.find({}).remove(function() {
    console.log('finished deleting notifications');
    cb();
  });
};

var createMdphNord = function(cb) {
  Mdph.create({
    id: 'nord',
    name: 'Nord',
    zipcode: '59',
    email: 'nord@nord.fr',
    logo: 'logo59.jpg'
  }, function(err, data) {
    mdphNord = data;
    console.log('finished creating mdph nord');
    cb();
  });
};

var createMdphCalvados = function(cb) {
  Mdph.create({
    id: 'calvados',
    name: 'Calvados',
    zipcode: '14',
    email: 'caen@caen.fr',
    logo: 'logo14.jpg'
  }, function(err, data) {
    mdphCalvados = data;
    console.log('finished creating mdph calvados');
    cb();
  });
};

var createAdminNord = function(cb) {
  User.create({
    provider: 'local',
    role: 'adminMdph',
    name: 'Nord',
    email: 'nord@nord.com',
    password: 'nord',
    mdph: mdphNord
  }, function(err, data) {
    nord = data;
    console.log('finished creating user nord');
    cb();
  });
};

var createAdminBar = function(cb) {
  User.create({
    provider: 'local',
    role: 'adminMdph',
    name: 'Bar',
    email: 'bar@bar.com',
    password: 'bar',
    mdph: mdphNord
  }, function(err, data) {
    bar = data;
    console.log('finished creating user bar');
    cb();
  });
};

var createFoo = function(cb) {
  User.create({
    provider: 'local',
    name: 'Foo',
    email: 'foo@foo.com',
    password: 'foo',
    requests: []
  }, function(err, data) {
    foo = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user foo');
    cb();
  });
};

var createBob = function(cb) {
  User.create({
    provider: 'local',
    name: 'Bob Duchemin',
    email: 'bob@bob.com',
    password: 'bob',
    requests: []
  }, function(err, data) {
    bob = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user bob');
    cb();
  });
};

var createMartin = function(cb) {
  User.create({
    provider: 'local',
    name: 'Martin Durand',
    email: 'martin@martin.com',
    password: 'martin',
    requests: []
  }, function(err, data) {
    martin = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user Martin');
    cb();
  });
};

var createFrancoise = function(cb) {
  User.create({
    provider: 'local',
    name: 'Francoise Lemarchand',
    email: 'fr@fr.fr',
    password: 'fr',
    requests: []
  }, function(err, data) {
    francoise = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user Francoise');
    cb();
  });
};

var createEmma = function(cb) {
  User.create({
    provider: 'local',
    name: 'Emma Lemarchand',
    email: 'emma@emma.fr',
    password: 'emma',
    requests: []
  }, function(err, data) {
    emma = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user Emma');
    cb();
  });
};

var createRox = function(cb) {
  User.create({
    provider: 'local',
    name: 'Rox Anne',
    email: 'rox@rox.fr',
    password: 'rox',
    requests: []
  }, function(err, data) {
    rox = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user Rox');
    cb();
  });
};

var createArnaud = function(cb) {
  User.create({
    provider: 'local',
    name: 'Arnaud Martin',
    email: 'arnaud@arnaud.fr',
    password: 'arnaud',
    requests: []
  }, function(err, data) {
    arnaud = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user Arnaud');
    cb();
  });
};

var createJerome = function(cb) {
  User.create({
    provider: 'local',
    name: 'Jérôme Martin',
    email: 'jerome@jerome.fr',
    password: 'jerome',
    requests: []
  }, function(err, data) {
    jerome = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user Arnaud');
    cb();
  });
};

var createElla = function(cb) {
  User.create({
    provider: 'local',
    name: 'Ella Pari',
    email: 'ella@ella.fr',
    password: 'ella',
    requests: []
  }, function(err, data) {
    ella = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user Ella');
    cb();
  });
};

var createPierre = function(cb) {
  User.create({
    provider: 'local',
    name: 'Pierre Poiret',
    email: 'pierre@pierre.fr',
    password: 'pierre',
    requests: []
  }, function(err, data) {
    pierre = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user pierre');
    cb();
  });
};

var createTanguy = function(cb) {
  User.create({
    provider: 'local',
    name: 'Tanguy Pat',
    email: 'tanguy@tanguy.fr',
    password: 'tanguy',
    requests: []
  }, function(err, data) {
    tanguy = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user Tanguy');
    cb();
  });
};

var createThibault = function(cb) {
  User.create({
    provider: 'local',
    name: 'Thibault Vig',
    email: 'thibault@thibault.fr',
    password: 'thibault',
    requests: []
  }, function(err, data) {
    thibault = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user Thibault');
    cb();
  });
};

var createFlorian = function(cb) {
  User.create({
    provider: 'local',
    name: 'Florian Abc',
    email: 'florian@florian.fr',
    password: 'florian',
    requests: []
  }, function(err, data) {
    florian = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating user Florian');
    cb();
  });
};

var createFlo = function(cb) {
  User.create({
    provider: 'local',
    name: 'Florian',
    email: 'flo@flo.com',
    password: 'flo',
    requests: []
  }, function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log('finished creating user flo');
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
    console.log('finished creating user admin');
    cb();
  });
};

var createAlice = function(cb) {
  User.create({
    provider: 'local',
    role: 'adminMdph',
    name: 'Alice',
    email: 'caen@caen.fr',
    password: 'caen',
    mdph: mdphCalvados
  }, function(err, data) {
    alice = data;
    console.log('finished creating user alice');
    cb();
  });
};

var createSophie = function(cb) {
  User.create({
    provider: 'local',
    role: 'adminMdph',
    name: 'Sophie',
    email: 'caen1@caen.fr',
    password: 'caen',
    mdph: mdphCalvados
  }, function(err, data) {
    sophie = data;
    console.log('finished creating user sophie');
    cb();
  });
};

var createJeanne = function(cb) {
  User.create({
    provider: 'local',
    role: 'adminMdph',
    name: 'Jeanne',
    email: 'caen2@caen.fr',
    password: 'caen',
    mdph: mdphCalvados
  }, function(err, data) {
    jeanne = data;
    console.log('finished creating user jeanne');
    cb();
  });
};

var createFooRequest = function(cb) {
  Request.create({
    formAnswers: {},
    user: foo,
    mdph: mdphNord,
    updatedAt: new Date(),
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'en_cours'
      }
    ],
    opened: true
  }, function(err, data) {
     fooRequest = data;
    console.log('finished creating request foo');
    cb();
  });
};

var createBobOldRequest = function(cb) {
  Request.create({
    formAnswers: {},
    user: bob,
    mdph: mdphCalvados,
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)), //yesterday
    steps: [
      {
        name: 'evaluation',
        state: 'valide'
      }
    ]
  }, function() {
    console.log('finished creating request old bob');
    cb();
  });
};

var createMartinOldRequest = function(cb) {
  Request.create({

    formAnswers: {
      'prestations': {
        'aah': {
          'date':'2014-09-08T22:00:00.000Z'
        }
      },
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
    user: martin,
    mdph: mdphCalvados,
    opened: true,
    requestStatus: 'Complète',
    evaluator: jeanne,
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)), //yesterday
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'valide'
      },
      {
        name: 'complementaire',
        state: 'valide'
      },
      {
        name: 'evaluation',
        state: 'en_cours'
      }
    ]
  }, function() {
    console.log('finished creating request old martin');
    cb();
  });
};

var createRoxOldRequest = function(cb) {
  Request.create({
    formAnswers: {},
    user: rox,
    mdph: mdphCalvados,
    opened: true,
    requestStatus: 'Emise',
    updatedAt: new Date(new Date().setDate(new Date().getDate())),
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'valide'
      },
      {
        name: 'complementaire',
        state: 'en_cours',
        files: [
          {
            "name": "bilanAccompagnementEnfant",
            "state": "demande"
          },
          {
            "name": "devis",
            "state": "demande"
          }
        ]
      }
    ]
  }, function(err, request) {
    console.log('finished creating request old rox: ' + request.shortId);
    cb();
  });
};

var createArnaudOldRequest = function(cb) {
  Request.create({
    formAnswers: {},
    user: arnaud,
    mdph: mdphCalvados,
    opened: true,
    requestStatus: 'Emise',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-50)),
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'valide'
      },
      {
        name: 'complementaire',
        state: 'en_cours',
        files: [
          {
            "name": "bilanAccompagnementEnfant",
            "state": "demande"
          },
          {
            "name": "devis",
            "state": "demande"
          }
        ]
      }
    ]
  }, function(err, request) {
    console.log('finished creating request old arnaud: ' + request.shortId);
    cb();
  });
};

var createJeromeOldRequest = function(cb) {
  Request.create({
    formAnswers: {},
    user: jerome,
    mdph: mdphCalvados,
    opened: true,
    requestStatus: 'Emise',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-10)),
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'valide'
      },
      {
        name: 'complementaire',
        state: 'en_cours',
        files: [
          {
            "name": "bilanAccompagnementEnfant",
            "state": "demande"
          },
          {
            "name": "devis",
            "state": "demande"
          }
        ]
      }
    ]
  }, function(err, request) {
    console.log('finished creating request old jerome: ' + request.shortId);
    cb();
  });
};

var createEllaOldRequest = function(cb) {
  Request.create({
    formAnswers: {},
    user: ella,
    mdph: mdphCalvados,
    opened: true,
    requestStatus: 'Emise',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)), //yesterday
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'valide'
      },
      {
        name: 'complementaire',
        state: 'en_cours',
        files: [
          {
            "name": "bilanAccompagnementEnfant",
            "state": "demande"
          },
          {
            "name": "devis",
            "state": "demande"
          }
        ]
      }
    ]
  }, function(err, request) {
    console.log('finished creating request old ella: ' + request.shortId);
    cb();
  });
};

var createTanguyOldRequest = function(cb) {
  Request.create({
    formAnswers: {},
    user: tanguy,
    mdph: mdphCalvados,
    opened: true,
    requestStatus: 'Emise',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)), //yesterday
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'valide'
      },
      {
        name: 'complementaire',
        state: 'en_cours',
        files: [
          {
            "name": "bilanAccompagnementEnfant",
            "state": "demande"
          },
          {
            "name": "devis",
            "state": "demande"
          }
        ]
      }
    ]
  }, function(err, request) {
    console.log('finished creating request old tanguy: ' + request.shortId);
    cb();
  });
};

var createThibaultOldRequest = function(cb) {
  Request.create({
    formAnswers: {},
    user: thibault,
    mdph: mdphCalvados,
    opened: true,
    requestStatus: 'Emise',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)), //yesterday
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'valide'
      },
      {
        name: 'complementaire',
        state: 'en_cours',
        files: [
          {
            "name": "bilanAccompagnementEnfant",
            "state": "demande"
          },
          {
            "name": "devis",
            "state": "demande"
          }
        ]
      }
    ]
  }, function(err, request) {
    console.log('finished creating request old thibault: ' + request.shortId);
    cb();
  });
};

var createFlorianOldRequest = function(cb) {
  Request.create({
    formAnswers: {},
    user: florian,
    mdph: mdphCalvados,
    opened: true,
    requestStatus: 'Emise',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)), //yesterday
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'valide'
      },
      {
        name: 'complementaire',
        state: 'en_cours',
        files: [
          {
            "name": "bilanAccompagnementEnfant",
            "state": "demande"
          },
          {
            "name": "devis",
            "state": "demande"
          }
        ]
      }
    ]
  }, function(err, request) {
    console.log('finished creating request old florian: ' + request.shortId);
    cb();
  });
};

var createPierreOldRequest = function(cb) {
  Request.create({
    formAnswers: {},
    user: pierre,
    mdph: mdphCalvados,
    opened: true,
    requestStatus: 'Emise',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)), //yesterday
    steps: [
      {
        name: 'questionnaire',
        state: 'complet'
      },
      {
        name: 'obligatoire',
        state: 'valide'
      },
      {
        name: 'complementaire',
        state: 'en_cours',
        files: [
          {
            "name": "bilanAccompagnementEnfant",
            "state": "demande"
          },
          {
            "name": "devis",
            "state": "demande"
          }
        ]
      }
    ]
  }, function(err, request) {
    console.log('finished creating request old pierre: ' + request.shortId);
    cb();
  });
};

var createBobRequest = function(cb) {
  Request.create({
    opened: true,
    user: bob,
    mdph: mdphCalvados,
    requestStatus: 'Emise',
    formAnswers: {
      'prestations': {
        'aah': {
          'date':'2014-09-08T22:00:00.000Z'
        }
      },
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
    evaluator: alice,
    updatedAt: new Date(),
    "steps": [
      {
        "name": "questionnaire",
        "state": "complet"
      },
      {
        "name": "obligatoire",
        "state": "a_valider",
        "files": [
          {
            "name": "certificatMedical",
            "state": "telecharge",
            "path": "martin.jpg",
            uploaderType: "Demandeur"
          },
          {
            "name": "carteIdentite",
            "state": "telecharge",
            "path": "martin.jpg",
            uploaderType: "Demandeur"
          }
        ]
      }
    ]
  }, function(err, data) {
    bobRequest = data;
    console.log('finished creating request bob');
    cb();
  });
};

var createFrancoiseRequest = function(cb) {
  Request.create({
    opened: true,
    user: francoise,
    evaluator: sophie,
    mdph: mdphCalvados,
    requestStatus: 'Emise',
    formAnswers: {
      'prestations': {
        'aah': {
          'date':'2014-09-08T22:00:00.000Z'
        }
      },
      'contexte': {
        'estRepresentant':true,
        'demandeur': {
           'prenom':'Francoise',
           'sexe':'féminin'
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
    "steps": [
      {
        "name": "questionnaire",
        "state": "complet"
      },
      {
        "name": "obligatoire",
        "state": "a_valider",
        "files": [
          {
            "name": "certificatMedical",
            "state": "telecharge",
            "path": "francoise.jpg",
            uploaderType: "Demandeur"
          },
          {
            "name": "carteIdentite",
            "state": "telecharge",
            "path": "francoise.jpg",
            uploaderType: "Demandeur"
          }
        ]
      }
    ]
  }, function(err, data) {
    francoiseRequest = data;
    console.log('finished creating request francoise');
    cb();
  });
};

var createEmmaRequest = function(cb) {
  Request.create({
    opened: true,
    user: emma,
    evaluator: jeanne,
    mdph: mdphCalvados,
    requestStatus: 'Emise',
    formAnswers: {
      'prestations': {
        'aah': {
          'date':'2014-09-08T22:00:00.000Z'
        }
      },
      'contexte': {
        'estRepresentant':true,
        'demandeur': {
           'prenom':'Emma',
           'sexe':'féminin'
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
    "steps": [
      {
        "name": "questionnaire",
        "state": "complet"
      },
      {
        "name": "obligatoire",
        "state": "a_valider",
        "files": [
          {
            "name": "certificatMedical",
            "state": "telecharge",
            "path": "francoise.jpg",
            uploaderType: "Demandeur"
          },
          {
            "name": "carteIdentite",
            "state": "telecharge",
            "path": "francoise.jpg",
            uploaderType: "Demandeur"
          }
        ]
      }
    ]
  }, function(err, data) {
    emmaRequest = data;
    console.log('finished creating request Emma');
    cb();
  });
};

var createMarc = function(cb) {
  Partenaire.create({
    email: 'marc@marc.fr',
    certified: 'En attente'
  }, function(err, data) {
    console.log('finished creating user marc');
    cb();
  });
};

var createAnne = function(cb) {
  Partenaire.create({
    email: 'anne@anne.fr',
    certified: 'En attente'
  }, function(err, data) {
    console.log('finished creating user anne');
    cb();
  });
};

var createLeo = function(cb) {
  Partenaire.create({
    email: 'leo@leo.fr',
    certified: 'Certifié'
  }, function(err, data) {
    console.log('finished creating user leo');
    cb();
  });
};

var createJean = function(cb) {
  Partenaire.create({
    email: 'jean@jean.fr',
    certified: 'Refusé'
  }, function(err, data) {
    console.log('finished creating user bobo');
    cb();
  });
};

var createNotifBob = function (cb){
  Notification.create({
    user: bob._id,
    message: 'Votre dossier a été affecté.',
    state: 'liste_demandes.demande.obligatoire',
    request: bobRequest._id
  }, function(err, data) {
    notifBob = data;
    if (err) {
      console.log(err);
    }
    console.log('finished creating notif for bob');
    cb();
  })
}

async.series([
  deleteUsers,
  deleteRequests,
  deleteMdphs,
  deletePartenaires,
  deleteNotifications,

  createMdphNord,
  createMdphCalvados,

  createFoo,
  createAdminNord,
  createAdminBar,
  createAlice,
  createBob,
  createFlo,
  createAdmin,
  createMartin,
  createRox,
  createSophie,
  createJeanne,
  createFrancoise,
  createEmma,
  createArnaud,
  createElla,
  createJerome,
  createPierre,
  createThibault,
  createTanguy,
  createFlorian,

  createMarc,
  createAnne,
  createLeo,
  createJean,

  createBobOldRequest,
  createBobRequest,
  createFooRequest,
  createMartinOldRequest,
  createRoxOldRequest,
  createFrancoiseRequest,
  createEmmaRequest,
  createArnaudOldRequest,
  createEllaOldRequest,
  createJeromeOldRequest,
  createPierreOldRequest,
  createThibaultOldRequest,
  createTanguyOldRequest,

  createNotifBob
]);
