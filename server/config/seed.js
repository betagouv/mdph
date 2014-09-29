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
               "_id":"54256c6657ad5bf81415d78a",
               "name":"Calvados",
               "zipcode":"14",
               "__v":0
            },
            "nouveauDossier":true,
            "dateNaissance":"1961-06-09T22:00:00.000Z",
            "urgences":{
               "formation":true
            },
            "urgences_formation":"2014-06-12T22:00:00.000Z"
         },
         "vieQuotidienne":{
            "famille":"parents",
            "logement":"independant",
            "logement_independant":"proprietaire",
            "mesPrestations":[

            ],
            "besoinsVie":{
               "courant":true,
               "budget":true,
               "hygiene":true,
               "habits":true,
               "courses":true,
               "cuisine":true,
               "repas":true,
               "menage":true
            },
            "besoinsDeplacement":{
               "intraDomicile":true,
               "accesDomicile":true,
               "public":true,
               "transports":true,
               "conduite":true,
               "vacances":true
            },
            "besoinsSocial":{
               "communication":true,
               "loisirs":true,
               "proches":true,
               "famille":true,
               "citoyen":true
            },
            "besoinsLieuDeVie":{
               "materiel":true,
               "conduite":true,
               "amenagement":true
            },
            "attentesTypeAide":{
               "materiel":true,
               "domicile":true,
               "financierHandicap":true,
               "etablissement":true
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
            "autresRenseignements":"Pas de renseignements.",
            "objetDemande":{

            }
         },
         "aidant":{
            "sectionLabel":"Aidant familial",
            "answers":{
               "condition":false
            }
         }
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
