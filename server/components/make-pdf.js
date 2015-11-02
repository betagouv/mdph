'use strict';

var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var tmp = require('tmp');
var async = require('async');
var pdf = require('html-pdf');

var config = require('../config/environment');
var PdfConvert = require('./pdf_utils/convert')(config.uploadDir);
var PdfJoin = require('./pdf_utils/join')();

var buildStructure = require('./pdf_structure/build');

var pdfOptions = { format: 'A4', border: '10px' };

var debug = false;

function printDebug(str, obj) {
  if (debug) {
    console.log(str);
    if (obj) console.log(obj);
  }
}

exports.make = function(request, user, recapitulatifHtml, done) {
  printDebug('makePdf: Transforming html to pdf');
  tmp.dir({unsafeCleanup: true}, function _tempDirCreated(err, tempDirPath, cleanupCallback) {
    if (err) throw err;

    var requestTempPdfPath = tempDirPath + '/' + request.shortId + '.pdf';
    printDebug('make: Creating ', requestTempPdfPath);

    pdf.create(recapitulatifHtml, pdfOptions).toFile(requestTempPdfPath, function(err, res) {
      if (err) return done(err);

      printDebug('make: Transforming for GED_59');
      async.waterfall([

        // Transform everything to pdf stream
        function(cb) {
          if (request.documents) {
            return PdfConvert.convertList(tempDirPath, request.documents, cb);
          }

          cb(null, []);
        },

        // Join everything in one stream
        function(documentList, cb) {
          var pdfStructure = buildStructure(request, user, res.filename, documentList);

          printDebug('make: finished building structure');
          cb(null, pdfStructure);
        },

        // Load everything in scissors
        PdfJoin.join

      ],

      function(err, pdfPath) {
        if (err) return done(err);

        printDebug('make: finished building pdf');

        setTimeout(function() {
          cleanupCallback();
        }, 600000);

        return done(null, pdfPath);
      });
    });
  });
};
