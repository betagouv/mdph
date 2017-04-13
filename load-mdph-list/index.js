'use strict';

var fs = require('fs');
var request = require('request');

// Download the reference file of MDPH list
var download = function(uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://api.opendata.onisep.fr/downloads/57e13aa4a3cee/57e13aa4a3cee.json', 'tmp_download.json', function() {
  console.log('done');
});
