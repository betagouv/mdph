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
        "email": "bob@bob.com",
        "dateNaissance": "1999-12-31T23:00:00.000Z",
        "adresse": "3 rue des pommiers",
        "adresse_complement": "Chez Papa",
        "code_postal": "90000",
        "commune": "Paris",
        "pays": "France"
      },
      "autorite": {
        "parent1": {
          "nom": "Dudu",
          "prenom": "Papa",
          "dateNaissance": "1979-12-31T23:00:00.000Z",
          "adresse": "3 rue des pommiers",
          "code_postal": "90000",
          "commune": "Paris",
          "pays": "France"
        },
        "parent2": {
          "nom": "Dudu",
          "prenom": "Maman",
          "dateNaissance": "1969-12-31T23:00:00.000Z",
          "adresse": "3 rue des pommiers",
          "code_postal": "80000",
          "commune": "Paris",
          "pays": "France"
        }
      },
      "aidantDemarche": [
        {
          "nom": "Toto",
          "prenom": "Titi",
          "dateNaissance": "1979-12-31T23:00:00.000Z",
          "adresse": "3 rue des poiriers",
          "code_postal": "60900",
          "commune": "Paris",
          "pays": "France"
        }
      ],
      "__completion": true
    },
    "vie_quotidienne": {
      "famille": "parents",
      "__lastSref": "departement.demande.vie_quotidienne.vos_attentes.autres_renseignements",
      "logement": "domicile",
      "logement_domicile": "parents",
      "aideActuelle": {
        "financiere": true,
        "technique": true,
        "techniqueDetail": {
          "animal": true,
          "vehicule": true
        }
      },
      "aideFinancierePresent": {
        "chomage": true,
        "rsa": true
      },
      "aideFinancierePasse": {
        "revenu": false
      },
      "retraite": false,
      "fraisHandicap": {
        "valeur": false,
        "listeFrais": [
          {
            "nom": "Frais 1",
            "frequence": "Fréquence 1",
            "total": "100",
            "rembourse": "0",
            "detail": "Précisions 1"
          },
          {
            "nom": "Frais 2",
            "frequence": "Fréquence 2",
            "total": "90",
            "rembourse": "90",
            "detail": "Précisions 2"
          }
        ]
      },
      "besoinsVie": {
        "repas": true,
        "habits": true
      },
      "besoinsDeplacement": {
        "intraDomicile": true,
        "accesDomicile": true,
        "public": true
      },
      "besoinsTransports": true,
      "besoinsSocial": {
        "loisirs": true,
        "proches": true
      },
      "attentesTypeAide": {
        "bilan": true,
        "mobilite": true,
        "accompagement": true,
        "materiel": true
      },
      "structures": {
        "valeur": false,
        "structures": [
          {
            "name": "",
            "contact": false
          }
        ]
      },
      "autresRenseignements": "azertyuiop",
      "__completion": true
    },
    "vie_scolaire": {
      "condition": true,
      "__lastSref": "departement.demande.vie_scolaire.vos_attentes.autres_renseignements",
      "vieScolaireType": "etablissementPartiel",
      "etablissement": {
        "valeur": false,
        "etablissements": [
          {
            "nom": "Boko",
            "rue": "^kp",
            "ville": "pookpo",
            "date": "1991-11-30T23:00:00.000Z"
          }
        ]
      },
      "typeEtudes": "qsdfgjklm",
      "diplomePasse": "azekozpdj paoùâkaz",
      "diplomePresent": "azpodjzo^d",
      "diplomeEtablissement": {
        "valeur": false,
        "etablissements": [
          {
            "nom": "aze",
            "rue": "zopep",
            "ville": "zea",
            "date": "2012-12-31T23:00:00.000Z"
          }
        ]
      },
      "parcoursEtudes": "zahiaz",
      "accompagnement": {
        "hopital": true
      },
      "adaptation": {
        "communication": true,
        "informatique": true
      },
      "emploiDuTemps": {
        "valeur": false,
        "jours": {
          "Lundi": {
            "matin": "Coucou",
            "midi": "Coucou2",
            "aprem": "Coucou3"
          },
          "Mardi": {
            "matin": "Coucou4",
            "midi": "Coucou5",
            "aprem": "Coucou6"
          },
          "Mercredi": {
            "matin": "Coucou7",
            "midi": "Coucou8",
            "aprem": "Coucou9"
          },
          "Jeudi": {
            "matin": "Coucou10",
            "midi": "Coucou11",
            "aprem": "Coucou12"
          },
          "Vendredi": {
            "matin": "Coucou13",
            "midi": "Coucou14",
            "aprem": "Coucou15"
          },
          "Samedi": {
            "matin": "Coucou16",
            "midi": "Coucou17",
            "aprem": "Coucou18"
          }
        }
      },
      "besoinsScolarite": {
        "calculer": true
      },
      "besoinsCommunication": {
        "securite": true
      },
      "besoinsEntretien": {
        "repas": true
      },
      "besoinsDeplacement": {
        "extraLocaux": true,
        "transports": true,
        "intraLocaux": true,
        "autre": true
      },
      "besoinsEntretienAutre": "Coucou",
      "attentesVieScolaire": {
        "aideMateriel": true,
        "readaptation": true,
        "etablissementSansHebergement": true
      },
      "structures": {
        "valeur": true,
        "structures": [
          {
            "name": "Structure 1",
            "contact": true
          },
          {
            "name": "Structure 2",
            "contact": false
          }
        ]
      },
      "autresRenseignements": "aspo",
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
    documents: [
      {
        "type": "certificatMedical"
      },
      {
        "type": "carteIdentite"
      }
    ],
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
    documents: [
      {
        "type": "certificatMedical"
      },
      {
        "type": "carteIdentite"
      }
    ],
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
    documents: [
      {
        "type": "certificatMedical"
      },
      {
        "type": "carteIdentite"
      }
    ],
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
