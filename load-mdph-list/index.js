'use strict';

var request = require('request');
var _ = require('lodash');
var fs = require('fs');

/*
 * ETL that load the reference file of MDPH list
 * (Extract Transform Load)
 *
 * ressource : http://www.data.gouv.fr/fr/datasets/maisons-departementales-de-personnes-handicapees-mdph-1/
 * */
var url = 'https://api.opendata.onisep.fr/downloads/57e13aa4a3cee/57e13aa4a3cee.json';
var tmp_file = __dirname + '/tmp_mdphs.json';

// Wont load that list of zipcodes
var zipCodeBlacklist = ['14', '17', '54'];

// [Extract] : Download the reference file of MDPH list
function extract(uri, callback) {
  request(uri, function(error, response, body) {
    console.log('Strart downloading reference json file');
    console.log('content-type:', response.headers['content-type']);
    if (response.headers['content-type'] !== 'application/json') {
      console.error('url file is not a json file');
    } else if (error) {
      console.error(error);
    } else {
      console.log('file downloaded');
      callback(JSON.parse(body), load);
    }
  });
};

// [Transform] : Format the list for the mongoDb
function transform(json, callback) {

  var result = _.chain(json)
    .groupBy('departement')
    .pairs()
    .map(function(departement) {

      // CP are provided as int, removing the starting 0
      function formatCP(cp) {
        var result = cp + '';
        return result.length === 5 ? result : '0' + result;
      }

      // Exctract zipcode from departement
      var name = departement[0].split(' - ')[1];

      // Exctract departemeent name from departement
      var zipcode = departement[0].split(' - ')[0];

      // Default values
      var logo = 'logotest.jpg';
      var photo = 'photo14.jpg';
      var enabled = true;
      var opened = false;
      var likes = [];

      var locations = _.map(departement[1], function(loc) {
        var location = {
          name: loc.nom,
          email: '',
          address: loc.adresse + ', ' + formatCP(loc.cp) + ', ' + loc.commune,
          coordinates: {
            coordx: loc.longitude_x,
            coordy: loc.latitude_y
          },
          phone: '',
          schedule:''
        };
        return location;
      });

      var currentMdphLabels = ['name', 'zipcode', 'logo', 'photo', 'enabled', 'opened', 'locations', 'likes'];
      var currentMdph = [name, zipcode, logo, photo, enabled, opened, locations, likes];

      // Make the departement to load
      return _.object(_.zip(currentMdphLabels, currentMdph));
    })
    .reject(function(mdph) {
      // Reject already loaded departements
      var reject = false;
      _.map(zipCodeBlacklist, function(zipcode) {
        if (mdph.zipcode === zipcode) {
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
  fs.writeFile(tmp_file, JSON.stringify(json), function() {
    console.log('You may load the mdphs list with :');
    console.log('mongoimport --db impact --collection mdphs --jsonArray --file tmp_mdphs.json');
  });
}

extract(url, transform);
