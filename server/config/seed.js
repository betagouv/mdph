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
    admin, nord, alice, bob, martin, rox, sophie, jeanne, francoise, arnaud, emma, jerome, ella, tanguy, pierre, thibault, florian,
    bobRequest, fooRequest, francoiseRequest, emmaRequest,
    notifBob;

var createFakeAnswers = function(nom, prenom) {
  return {
    "identites": {
      "beneficiaire": {
        "nom": nom,
        "prenom": prenom,
        "sexe": "masculin",
        "nationalite": "francaise",
        "dateNaissance": "1989-12-31T23:00:00.000Z",
        "adresse": "3 rue des pommiers",
        "adresse_complement": "",
        "code_postal": "75000",
        "commune": "Paris",
        "pays": "France"
      },
      "__completion": true
    },
    "vie_quotidienne": {
      "famille": "couple",
      "logement": "domicile",
      "logement_domicile": "parents",
      "aideActuelle": {
        "technique": true,
        "techniqueDetail": {
          "vehicule": true
        }
      },
      "fraisHandicap": {
        "listeFrais": [
          {
            "nom": "Frais 1",
            "frequence": "Fréquence 1",
            "total": "Montant total 1",
            "rembourse": "Montant remboursé 1",
            "detail": "Précisions 1"
          },
          {
            "nom": "Frais 2",
            "frequence": "Fréquence 2",
            "total": "Montant total 2",
            "rembourse": "Montant remboursé 2",
            "detail": "Précisions 2"
          }
        ]
      },
      "besoinsVie": {
        "budget": true,
        "hygiene": true,
        "habits": true
      },
      "besoinsDeplacement": {
        "public": true,
        "conduite": true,
        "transports": true
      },
      "besoinsTransports": false,
      "besoinsSocial": {
        "famille": true,
        "proches": true,
        "loisirs": true
      },
      "attentesTypeAide": {
        "accompagement": true,
        "mobilite": true,
        "financierMinimum": true
      },
      "structures": {
        "structures": [
          {
            "name": "",
            "contact": false
          }
        ],
        "valeur": false
      },
      "autresRenseignements": "azertyuiop",
      "__completion": true
    },
    "situations_particulieres": {
      "urgences": {
        "ecole": true,
        "hospitalisation": true
      },
      "hospitalisationDetail": "aaaa",
      "ecoleDetail": "zzzz",
      "__completion": true
    },
    "vie_scolaire": {
      "condition": true,
      "vieScolaireType": "ordinaire",
      "besoinsScolarite": {
        "calculer": true,
        "comprendre": true
      },
      "besoinsCommunication": {
        "relation": true
      },
      "besoinsEntretien": {
        "sante": true,
        "repas": true,
        "habiller": true
      },
      "besoinsDeplacement": {
        "extraLocaux": true,
        "transports": true
      },
      "attentesVieScolaire": {
        "aideHumaine": true,
        "aideMateriel": true,
        "readaptation": true,
        "etablissementSansHebergement": true
      },
      "structure": {
        "structures": [
          {
            "name": "",
            "contact": false
          }
        ],
        "valeur": false
      },
      "autresRenseignements": "hiohio",
      "__completion": true,
      "etablissement": {
        "valeur": false,
        "etablissements": [
          {
            "nom": "Etablissement 1",
            "rue": "Rue 1",
            "ville": "Ville 1",
            "date": "2009-12-31T23:00:00.000Z"
          }
        ]
      },
      "typeEtudes": "ezr",
      "diplomePasse": "zer",
      "diplomePresent": "zetrfecds",
      "diplomeEtablissement": {
        "valeur": false,
        "etablissements": [
          {
            "nom": "Etablissement 2",
            "rue": "Rue 2",
            "ville": "Ville 2",
            "date": "2009-12-31T23:00:00.000Z"
          },
          {
            "nom": "Etablissement 3",
            "rue": "Rue 3",
            "ville": "Ville 3",
            "date": "2013-12-31T23:00:00.000Z"
          }
        ]
      },
      "parcoursEtudes": "efsdwx",
      "accompagnement": {
        "liberal": true,
        "hopital": false
      },
      "adaptation": {
        "communication": true,
        "informatique": true,
        "audition": true
      },
      "emploiDuTemps": {
        "jours": [
          {
            "jour": "Lundi",
            "matin": "1",
            "midi": "2",
            "aprem": "3"
          },
          {
            "jour": "Mardi",
            "matin": "4",
            "midi": "5",
            "aprem": "6"
          },
          {
            "jour": "Mercredi",
            "matin": "7",
            "midi": "8",
            "aprem": "9"
          },
          {
            "jour": "Jeudi",
            "matin": "10",
            "midi": "11",
            "aprem": "12"
          },
          {
            "jour": "Vendredi",
            "matin": "13",
            "midi": "14",
            "aprem": "15"
          },
          {
            "jour": "Samedi",
            "matin": "16",
            "midi": "17",
            "aprem": "18"
          }
        ]
      }
    },
    "vie_au_travail": {
      "conditionTravail": false,
      "passe": false,
      "situationSansEmploi": {
        "etudiant": true
      },
      "etudiantDetail": "klnùùml",
      "situationAccompagnement": {
        "poleEmploi": true,
        "capEmploi": true
      },
      "prestations": {
        "fiphfp": true
      },
      "rqth": false,
      "cv": {
        "experiences": [
          {
            "intitule": "Expérience 1",
            "employeur": "Entreprise 1",
            "contrat": "CDI",
            "debut": "2011-12-31T23:00:00.000Z",
            "fin": "2013-12-30T23:00:00.000Z",
            "motif": "Motif 1"
          },
          {
            "intitule": "Expérience 2",
            "employeur": "Entreprise 2",
            "contrat": "CDI",
            "debut": "2013-12-31T23:00:00.000Z",
            "motif": "Motif 2"
          }
        ]
      },
      "description": false,
      "besoinSoutien": {
        "precisions": true,
        "environnement": true
      },
      "structures": {
        "structures": [
          {
            "name": "",
            "contact": false
          }
        ],
        "valeur": false
      },
      "autresRenseignements": "fgbhjn,k",
      "__completion": true
    }
  }

};

var deletePartenaires = function(cb) {
  Partenaire.remove({}, function() {
    console.log('finished deleting partenaires');
    cb();
  });
};

var deleteUsers = function(cb) {
  User.remove({}, function() {
    console.log('finished deleting users');
    cb();
  });
};

var deleteRequests = function(cb) {
  Request.remove({}, function() {
    console.log('finished deleting requests');
    cb();
  });
};

var deleteMdphs = function(cb) {
  Mdph.remove({}, function() {
    console.log('finished deleting mdphs');
    cb();
  });
};

var deleteNotifications = function(cb) {
  Notification.remove({}, function() {
    console.log('finished deleting notifications');
    cb();
  });
};

var createMdphNord = function(cb) {
  Mdph.create({
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
    email: 'nord@nord.fr',
    password: 'nord',
    mdph: mdphNord
  }, function(err, data) {
    nord = data;
    console.log('finished creating user nord');
    cb();
  });
};

var createBob = function(cb) {
  User.create({
    provider: 'local',
    name: 'Bob Duchemin',
    email: 'rri@octo.com',
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

var createBobOldRequest = function(cb) {
  Request.create({
    formAnswers: createFakeAnswers('bob', 'duchemin'),
    user: bob,
    mdph: '14',
    documents: [],
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)),
    createdAt: new Date(new Date().setDate(new Date().getDate()-4)),
    status: 'reponse'
  }, function() {
    console.log('finished creating request old bob');
    cb();
  });
};

var createMartinOldRequest = function(cb) {
  Request.create({
    formAnswers: createFakeAnswers('martin', 'martin'),
    mdph: "14",
    user: martin,
    status: 'emise',
    evaluator: jeanne,
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)),
    createdAt: new Date(new Date().setDate(new Date().getDate()-2))
  }, function() {
    console.log('finished creating request old martin');
    cb();
  });
};

var createRoxOldRequest = function(cb) {
  Request.create({
    formAnswers: createFakeAnswers('rox', 'rox'),
    user: rox,
    mdph: "14",
    status: 'en_cours',
    documents: [],
    updatedAt: new Date(new Date().setDate(new Date().getDate())),
    createdAt: new Date(new Date().setDate(new Date().getDate()-4))
  }, function(err, request) {
    if (err) console.log(err);
    console.log('finished creating request old rox: ' + request.shortId);
    cb();
  });
};

var createArnaudOldRequest = function(cb) {
  Request.create({
    formAnswers: createFakeAnswers('arnaud', 'arnaud'),
    user: arnaud,
    mdph: '14',
    status: 'en_cours',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-50)),
    createdAt: new Date(new Date().setDate(new Date().getDate()-50))
  }, function(err, request) {
    if (err) console.log(err);
    console.log('finished creating request old arnaud: ' + request.shortId);
    cb();
  });
};

var createJeromeOldRequest = function(cb) {
  Request.create({
    user: jerome,
    mdph: '14',
    formAnswers: createFakeAnswers('jerome', 'jerome'),
    status: 'emise',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-10)),
    createdAt: new Date(new Date().setDate(new Date().getDate()-15))
  }, function(err, request) {
    if (err) console.log(err);
    console.log('finished creating request old jerome: ' + request.shortId);
    cb();
  });
};

var createEllaOldRequest = function(cb) {
  Request.create({
    formAnswers: createFakeAnswers('ella', 'ella'),
    user: ella,
    mdph: '14',
    status: 'en_cours',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)),
    createdAt: new Date(new Date().setDate(new Date().getDate()-15))
  }, function(err, request) {
    if (err) console.log(err);
    console.log('finished creating request old ella: ' + request.shortId);
    cb();
  });
};

var createTanguyOldRequest = function(cb) {
  Request.create({
    formAnswers: createFakeAnswers('tanguy', 'tanguy'),
    user: tanguy,
    mdph: '14',
    status: 'en_cours',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)),
    createdAt: new Date(new Date().setDate(new Date().getDate()-2))
  }, function(err, request) {
    if (err) console.log(err);
    console.log('finished creating request old tanguy: ' + request.shortId);
    cb();
  });
};

var createThibaultOldRequest = function(cb) {
  Request.create({
    formAnswers: createFakeAnswers('thibault', 'thibault'),
    user: thibault,
    mdph: '14',
    status: 'en_cours',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)),
    createdAt: new Date(new Date().setDate(new Date().getDate()-2))
  }, function(err, request) {
    if (err) console.log(err);
    console.log('finished creating request old thibault: ' + request.shortId);
    cb();
  });
};

var createFlorianOldRequest = function(cb) {
  Request.create({
    formAnswers: createFakeAnswers('florian', 'florian'),
    user: florian,
    mdph: '14',
    status: 'en_cours',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)),
    createdAt: new Date(new Date().setDate(new Date().getDate()-15))
  }, function(err, request) {
    if (err) console.log(err);
    console.log('finished creating request old florian: ' + request.shortId);
    cb();
  });
};

var createPierreOldRequest = function(cb) {
  Request.create({
    formAnswers: createFakeAnswers('pierre', 'pierre'),
    user: pierre,
    mdph: '14',
    status: 'en_cours',
    updatedAt: new Date(new Date().setDate(new Date().getDate()-1)),
    createdAt: new Date(new Date().setDate(new Date().getDate()-3))
  }, function(err, request) {
    if (err) console.log(err);
    console.log('finished creating request old pierre: ' + request.shortId);
    cb();
  });
};

var createBobRequest = function(cb) {
  Request.create({
    user: bob,
    mdph: '14',
    status: 'evaluation',
    formAnswers: createFakeAnswers('bob', 'bob'),
    evaluator: alice,
    updatedAt: new Date(),
    createdAt: new Date(new Date().setDate(new Date().getDate()-15))
  }, function(err, data) {
    bobRequest = data;
    console.log('finished creating request bob');
    cb();
  });
};

var createFrancoiseRequest = function(cb) {
  Request.create({
    user: francoise,
    evaluator: sophie,
    mdph: '14',
    status: 'en_cours',
    formAnswers: createFakeAnswers('francois', 'francois'),
    updatedAt: new Date(),
    createdAt: new Date(new Date().setDate(new Date().getDate()-15))
  }, function(err, data) {
    francoiseRequest = data;
    console.log('finished creating request francoise');
    cb();
  });
};

var createEmmaRequest = function(cb) {
  Request.create({
    user: emma,
    evaluator: jeanne,
    mdph: '14',
    status: 'en_cours',
    formAnswers: createFakeAnswers('emma', 'emma'),
    updatedAt: new Date(),
    createdAt: new Date(new Date().setDate(new Date().getDate()-1))
  }, function(err, data) {
    emmaRequest = data;
    console.log('finished creating request Emma');
    cb();
  });
};

var createMarc = function(cb) {
  Partenaire.create({
    name: 'Marco Livier',
    email: 'marc@marc.fr',
    certified: 'en_attente'
  }, function(err, data) {
    console.log('finished creating user marc');
    cb();
  });
};

var createAnne = function(cb) {
  Partenaire.create({
    name: 'Anne Rox',
    email: 'anne@anne.fr',
    certified: 'en_attente'
  }, function(err, data) {
    console.log('finished creating user anne');
    cb();
  });
};

var createLeo = function(cb) {
  Partenaire.create({
    name: 'Mu Fasa',
    email: 'leo@leo.fr',
    certified: 'certifie'
  }, function(err, data) {
    console.log('finished creating user leo');
    cb();
  });
};

var createJean = function(cb) {
  Partenaire.create({
    name: 'Jean Bon',
    email: 'jean@jean.fr',
    certified: 'refuse'
  }, function(err, data) {
    console.log('finished creating user bobo');
    cb();
  });
};

var createNotifBob = function (cb){
  Notification.create({
    user: bob._id,
    message: 'Votre dossier est en cours d\'instruction.',
    state: 'espace_perso.liste_demandes.demande.obligatoire',
    request: bobRequest.shortId
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

  createAdminNord,
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
  createMartinOldRequest,
  createFrancoiseRequest,
  createEmmaRequest,
  createRoxOldRequest,
  createArnaudOldRequest,
  createEllaOldRequest,
  createJeromeOldRequest,
  createPierreOldRequest,
  createThibaultOldRequest,
  createTanguyOldRequest,

  createNotifBob
]);
