'use strict';

var _ = require('lodash');
var path = require('path');
var async = require('async');
var fs = require('fs');
var tmp = require('tmp');

module.exports = function(pdfStructure, directory, callback) {
  async.map(pdfStructure, function(currentFile, mapCallBack) {

    const mapCallBackOnce = _.once(mapCallBack);

    if (typeof currentFile !== 'string') {
      tmp.file({dir: directory, keep: true}, function _tempFileCreated(err, path) {
        if (err) return mapCallBackOnce(err);

        const writeStream = fs.createWriteStream(path);

        writeStream.on('close', function() {
          mapCallBackOnce(null, path);
        });

        writeStream.on('error', function(err) {
          mapCallBackOnce(err);
        });

        currentFile.pipe(writeStream);
      });
    } else {
      mapCallBack(null, currentFile);
    }
  },

  callback);
};
