'use strict';

var request = require('request');
var _ = require('lodash');

/*
 * ETL that load the reference file of MDPH list
 * (Extract Transform Load)
 *
 * ressource : http://www.data.gouv.fr/fr/datasets/maisons-departementales-de-personnes-handicapees-mdph-1/
 * */
var url = 'https://api.opendata.onisep.fr/downloads/57e13aa4a3cee/57e13aa4a3cee.json';
var tmp_file = 'tmp_download.json';

// Wont load that list of zipcodes
var zipCodeBlacklist = ['14', '17', '54'];

// [Extract] : Download the reference file of MDPH list
function extract(uri, filename, callback) {
  request(uri, function(error, response, body) {
    console.log('content-type:', response.headers['content-type']);
    if (error) {
      console.error(error);
    } else {
      var json = JSON.parse(body);
      callback(json, load);
    }
  });
};

// [Transform] : Format the list for the mongoDb
function transform(json, callback) {

  var result = _.chain(json)
    .groupBy('departement')
    .pairs()
    .map(function(departement) {

      var names = _.map(departement[1], function(loc) {
        return loc.nom;
      });

      function shortest(names) {
        var name = names[0];
        names.forEach(function(n) {
          name = n.length > name.length ? name : n;
        });

        return name;
      }

      var name = shortest(names);
      var zipcode = departement[0].split(' ')[0];

      var logo = 'logotest.jpg';
      var photo = 'photo14.jpg';
      var enabled = true;
      var opened = true;
      var likes = [];

      var locations = _.map(departement[1], function(loc) {
        var location = {
          email: '',
          address: loc.adresse + ', ' + loc.cp + ', ' + loc.commune,
          coordinates: {coordx: loc.longitude_x, coordy: loc.longitude_y},
          phone: '',
          schedule:''
        };
        return location;
      });

      var currentMdphLabels = ['name', 'zipcode', 'logo', 'photo', 'enabled', 'opened', 'locations', 'likes'];
      var currentMdph = [name, zipcode, logo, photo, enabled, opened, locations, likes];

      return _.object(_.zip(currentMdphLabels, currentMdph));
    })
    .reject(function(mdph) {
      var reject = false;
      _.map(zipCodeBlacklist, function(zipcode) {
        if (mdph.zipcode === zipcode) {
          console.log('mdph.zipcode', zipcode);
          reject = true;
        }
      });

      return reject;
    })
    .value();

  callback(result);
};

// [Load] :
function load(json) {
  console.log(json);
}

extract(url, tmp_file, transform);
