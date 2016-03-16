/*jslint bitwise: true */

'use strict';

var async = require('async');
var tmp = require('tmp');
var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');

var PdfJoin = function() {

  if (!(this instanceof PdfJoin)) {
    return new PdfJoin();
  }

  var join = function(fileList, callback) {
    callback = callback || function() { };

    tmp.file({keep: true}, function _tempFileCreated(err, pdfPath, fd, cleanupCallback) {
      if (err) return callback(err);

      var args = fileList.concat(['cat', 'output', pdfPath]);
      console.log(args);
      var pdftk = spawn('pdftk', args);

      pdftk.stderr.on('data', function(data) {
        // TODO log and return error in pdf
        console.log('pdftk encountered an error:\n', String(data));
        callback(null, path.join(__dirname, 'pdf-sample.pdf'), cleanupCallback);
      });

      pdftk.on('exit', function(code) {
        callback(null, pdfPath, cleanupCallback);
      });
    });
  };

  /*
   * Expose public API calls
   */
  this.join = join;
  return this;
};

module.exports = PdfJoin;
