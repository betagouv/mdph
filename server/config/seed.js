/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Mdph = require('../api/mdph/mdph.model');
var Form = require('../api/form/form.model');

Form.find({}).remove(function() {
  console.log('finished deleting forms');
});

User.find({}).remove(function() {
  console.log('finished deleting users');
});

Mdph.find({}).remove(function() {
  Mdph.create({
    name: 'Nord',
    zipcode: '59'
  }, function(err, mdphNord) {
    User.create({
      provider: 'local',
      role: 'adminMdph',
      name: 'Bar',
      email: 'bar@bar.com',
      password: 'bar',
      mdph: mdphNord
    });

    User.create({
      provider: 'local',
      name: 'Foo',
      email: 'foo@foo.com',
      password: 'foo',
      mdph: mdphNord
    }, function(err, foo) {
      Form.create({
        user: foo,
        formAnswers: {},
        updatedAt: new Date(),
        step: 'obligatoire'
      });
    });
  });

  Mdph.create({
    name: 'Calvados',
    zipcode: '14'
  }, function(err, mdphCalvados) {
    User.create({
      provider: 'local',
      name: 'Bob',
      email: 'bob@bob.com',
      password: 'bob',
      mdph: mdphCalvados
    }, function(err, bob) {
      Form.create({
        user: bob,
        formAnswers: {
          "contexte":{
            "estRepresentant":true,
            "demandeur":{
               "prenom":"Bobby",
               "sexe":"masculin"
            },
            "mdph":{
               "_id":"542a6da264487ac40501ab27",
               "name":"Calvados",
               "zipcode":"14",
               "__v":0
            },
            "nouveauDossier":false,
            "numDossier":true,
            "numeroDossier":"21",
            "raison":{
               "finDeVosDroits":true
            },
            "connaisTaux":true,
            "tauxIncapacite":79,
            "contestationTaux":"stable",
            "dateNaissance":"1981-05-12T22:00:00.000Z",
            "urgences":{
               "domicile":false,
               "formation":true
            },
            "formationDetail":"2014-10-21T22:00:00.000Z"
          },
          "vieQuotidienne":{
            "famille":"parents",
            "logement":"independant",
            "logement_independant":"proprietaire",
            "mesPrestations":[
               {
                  "id":"aah",
                  "label":"AAH",
                  "date":"2014-09-08T22:00:00.000Z",
                  "type":"presta-finances",
                  "description":"L'allocation aux adultes handicapés (AAH) est versée, sous conditions de ressources, aux adultes déclarés handicapés afin de leur assurer un revenu minimum."
               }
            ],
            "besoinsVie":{
               "courses":true,
               "habits":true,
               "budget":true,
               "courant":true,
               "repas":true,
               "menage":true
            },
            "besoinsDeplacement":{
               "intraDomicile":true,
               "public":true,
               "transports":true,
               "vacances":true
            },
            "besoinsSocial":{
               "communication":true,
               "proches":true,
               "securite":true,
               "citoyen":true
            },
            "besoinsLieuDeVie":{
               "materiel":true,
               "conduite":true
            },
            "attentesTypeAide":{
               "domicile":true,
               "amenagement":true,
               "financierHandicap":true,
               "mobilite":true,
               "etablissement":true,
               "materiel":true
            },
            "structures":{
               "valeur":false,
               "structures":[
                  {
                     "name":"",
                     "contact":false
                  }
               ]
            },
            "autresRenseignements":"",
            "objetDemande":{
               "travail":false
            }
          },
          "aidant":{
            "sectionLabel":"Aidant familial",
            "answers":{
               "condition":false
            }
          },
          "envoi":true
        },
        updatedAt: new Date(),
        step: 'obligatoire'
      })
    });

    User.create({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    });

    User.create({
      provider: 'local',
      role: 'adminMdph',
      name: 'Alice',
      email: 'alice@alice.com',
      password: 'alice',
      mdph: mdphCalvados
    }, function() {
      console.log('finished populating users');
    });
  });
});
