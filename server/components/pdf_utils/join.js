/*jslint bitwise: true */

'use strict';

var async = require('async');
var tmp = require('tmp');
var spawn = require('child_process').spawn;
var fs = require('fs');

var PdfJoin = function() {

  if (!(this instanceof PdfJoin)) {
    return new PdfJoin();
  }

  var join = function(fileList, callback) {
    callback = callback || function() { };

    tmp.file({keep: true}, function _tempFileCreated(err, pdfPath, fd, cleanupCallback) {
      if (err) callback(err);

      var args = fileList.concat(['cat', 'output', pdfPath]);
      var pdftk = spawn('pdftk', args);

      // pdftk.stderr.on('data', function(data) {
      //   console.log('pdftk encountered an error:\n', String(data));
      // });

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
