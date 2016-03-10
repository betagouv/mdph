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
var convertFromGridFS = require('./pdf_structure/convert');

var Recapitulatif = require('./recapitulatif');

var pdfOptions = {
  format: 'A4',
  border: '.25"',
  footer: {
    height: '40px',
    contents: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>'
  }
};

var debug = false;

function printDebug(str, obj) {
  if (debug) {
    console.log(str);
    if (obj) console.log(obj);
  }
}

exports.make = function({request, host, role}, done) {
  printDebug('makePdf: Transforming html to pdf');

  Recapitulatif.answersToHtml({request, host}, function(err, recapitulatifHtml) {
    tmp.dir({unsafeCleanup: true}, function _tempDirCreated(err, tempDirPath, cleanupCallback) {
      if (err) throw err;

      var requestTempPdfPath = tempDirPath + '/' + request.shortId + '.pdf';
      printDebug('make: Creating ', requestTempPdfPath);

      pdf.create(recapitulatifHtml, pdfOptions).toFile(requestTempPdfPath, function(err, res) {
        if (err) return done(err);

        if (role === 'user') {
          return done(null, requestTempPdfPath);
        }

        printDebug('make: Transforming');
        async.waterfall([

          // Transform everything to pdf stream
          function(cb) {
            if (request.documents) {
              return PdfConvert.convertList(tempDirPath, request.documents, cb);
            }

            return cb(null, []);
          },

          // Join everything in one stream
          function(documentList, cb) {
            return buildStructure(request, res.filename, documentList, cb);
          },

          // Transform all GridFS files to temporary directory
          function(pdfStructure, cb) {
            return convertFromGridFS(pdfStructure, tempDirPath, cb);
          },

          // Load everything in scissors
          PdfJoin.join

        ],

        function(err, pdfPath, joinCleanupCallback) {
          if (err) return done(err);
          printDebug('make: finished building pdf');

          setTimeout(function() {
            cleanupCallback();
            joinCleanupCallback();
          }, 600000);

          return done(null, pdfPath);
        });
      });
    });
  });
};
