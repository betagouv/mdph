/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Mdph = require('../api/mdph/mdph.model');
var Form = require('../api/form/form.model');

Form.find({}).remove(function() {
  console.log('finished deleting forms')
});

Mdph.find({}).remove(function() {
  Mdph.create({
    name: 'Nord',
    zipcode: '59'
  });
  Mdph.create({
    name: 'Calvados',
    zipcode: '14'
  }, function(err, mdphCalvados) {
      User.find({}).remove(function() {
        User.create({
          provider: 'local',
          name: 'Bob',
          email: 'bob@bob.com',
          password: 'bob',
          mdph: mdphCalvados
        }, function(err, bob) {
          Form.create({
            user: bob,
            formAnswers: {},
            updatedAt: new Date(),
            step: 'preEnvoi'
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
          }
        );
      });
    }
  );
});
