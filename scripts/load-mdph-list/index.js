'use strict';

var request = require('request');
var _ = require('lodash');
var fs = require('fs');

/*
 * ETL that load the reference file of MDPH list
 * (Extract Transform Load)
 *
 * ressources :
 *        http://www.data.gouv.fr/fr/datasets/maisons-departementales-de-personnes-handicapees-mdph-1/
 *        http://opendata.onisep.fr/data/57e13aa4a3cee/2-maisons-departementales-de-personnes-handicapees-mdph-.htm?tab=download
 * */
var url = 'https://api.opendata.onisep.fr/tmp/9b/8b/8e3e05812a7ac985176074003eff/maisons_departementales_de_personnes_handicapees_mdph.json';
var tmp_file = __dirname + '/tmp_mdphs.json';

// Wont load that list of zipcodes
var zipCodeBlacklist = ['51', '17', '47', '93', '11', '06', '59', '14', '54', '75', '56', '76'];

// By default will generate production json, so will take 'zipCodeBlacklist' in account
var PRODUCTION = true;

var isEnabledList = ['14', '17', '54'];
var isOpenedList = ['14', '17', '54'];
var hasLogoList = ['59', '14', '93', '06', '54', '17', '75', '56', '76'];

process.argv.forEach(function(arg) {
  if (arg === '--dev') {
    console.warn('DEVELOPMENT json to be generated, do not deploy this in production!');
    PRODUCTION = false;
  }
});

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

      function formatName(name) {
        const TO_CUT = [' site de ', 'site d\''];

        if (name.split(TO_CUT[0])[1]) {
          return 'Site de ' + name.split(TO_CUT[0])[1];
        }

        if (name.split(TO_CUT[1])[1]) {
          return 'Site d\'' + name.split(TO_CUT[1])[1];
        }

        return 'Siège';
      }

      function isHeadquarter(name) {
        const TO_CUT = [' site de ', 'site d\''];
        return !(name.split(TO_CUT[0])[1] || name.split(TO_CUT[1])[1]);
      }

      function isTrue(list, zipcode) {
        return _.indexOf(list, zipcode) >= 0;
      }

      function getLogo(list, zipcode) {
        if (_.indexOf(list, zipcode) >= 0) {
          return 'logo' + zipcode + '.jpg';
        }

        return 'logotest.jpg';
      }

      // Exctract zipcode from departement
      var name = departement[0].split(' - ')[1];

      // Exctract departemeent name from departement
      var zipcode = departement[0].split(' - ')[0];

      // Default values
      var logo = getLogo(hasLogoList, zipcode);
      var enabled = isTrue(isEnabledList, zipcode);
      var opened = isTrue(isOpenedList, zipcode);
      var likes = [];

      var locations = _.map(departement[1], function(loc) {
        var location = {
          name: formatName(loc.nom),
          headquarter: isHeadquarter(loc.nom),
          email: '',
          address: loc.adresse + ', ' + formatCP(loc.cp) + ' ' + loc.commune,
          coordinates: {
            coordx: loc.longitude_x,
            coordy: loc.latitude_y
          },
          phone: '',
          schedule:''
        };
        return location;
      });

      var currentMdphLabels = ['name', 'zipcode', 'logo', 'enabled', 'opened', 'locations', 'likes'];
      var currentMdph = [name, zipcode, logo, enabled, opened, locations, likes];

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

      // Only reject in production mode
      return reject && PRODUCTION;
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
