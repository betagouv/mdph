/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Mdph = require('../api/mdph/mdph.model');
var Form = require('../api/form/form.model');

console.log('test');

Form.find({}).remove(function() {
  console.log('finished deleting forms')
});

Mdph.find({}).remove(function() {
  Mdph.create({
    name: 'Mdph du Calvados',
    zipcode: '14000'
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
            user: bob
          })
        });
        User.create({
          provider: 'local',
          role: 'adminMdph',
          name: 'Alice',
          email: 'alice@alice.com',
          password: 'alice',
          mdph: mdphCalvados
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@admin.com',
          password: 'admin'
        }, function() {
            console.log('finished populating users');
          }
        );
      });
    }
  );
});
