/*jslint bitwise: true */

'use strict';

var async = require('async');
var scissors = require('scissors');

var PdfJoin = function() {

  if (!(this instanceof PdfJoin)) {
    return new PdfJoin();
  }

  var asStream = function(fileList, callback) {
    callback = callback || function() { };

    async.map(fileList, function(file, mapCallback) {
      mapCallback(null, scissors(file));
    },

    function(err, scissorsStructure) {
      var stream = scissors
        .join.apply(scissors, scissorsStructure)
        .pdfStream();

      callback(null, stream);
    });
  };

  /*
   * Expose public API calls
   */
  this.asStream = asStream;
  return this;
};

module.exports = PdfJoin;
