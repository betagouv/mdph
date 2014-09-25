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
            "sectionLabel":"Contexte",
            "answers":{
              "estRepresentant":false,
              "mdph": mdphCalvados,
              "nouveauDossier":true,
              "dateNaissance":"1981-04-30T22:00:00.000Z",
              "situations":{
                 "label":"Situations particulières",
                 "answers":{
                    "urgences":{
                       "domicile":false,
                       "formation":true
                    },
                    "urgences_domicile":"Je suis a la rue",
                    "urgences_formation":"1982-05-11T22:00:00.000Z"
                 }
              }
            }
            },
            "vie":{
            "sectionLabel":"Votre vie quotidienne",
            "answers":{
              "situation":{
                 "label":"Votre situation",
                 "answers":{
                    "famille":"seul",
                    "logement":"independant",
                    "logement_independant":"locataire",
                    "mesPrestations":[

                    ]
                 }
              },
              "besoins":{
                 "label":"Besoins dans la vie quotidienne",
                 "answers":{
                    "besoinsVie":{
                       "courant":true,
                       "hygiene":true,
                       "budget":true,
                       "courses":true,
                       "habits":true,
                       "cuisine":true,
                       "repas":true,
                       "menage":true
                    },
                    "besoinsDeplacement":{
                       "intraDomicile":true,
                       "accesDomicile":true,
                       "public":true
                    },
                    "besoinsSocial":{
                       "communication":true,
                       "loisirs":true,
                       "proches":true,
                       "famille":true
                    },
                    "besoinsLieuDeVie":{
                       "materiel":true,
                       "conduite":true
                    }
                 }
              },
              "attentes":{
                 "label":"Vos attentes pour compenser votre handicap",
                 "answers":{
                    "attentesTypeAide":{
                       "domicile":true,
                       "materiel":true,
                       "etablissement":true,
                       "financierMinimum":true,
                       "amenagement":true,
                       "financierHandicap":true
                    },
                    "structures":{
                       "valeur":true,
                       "structures":[
                          {
                             "name":"Monoprix",
                             "contact":true
                          }
                       ]
                    },
                    "autresRenseignements":"Je suis bob.",
                    "objetDemande":{

                    }
                 }
              }
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
