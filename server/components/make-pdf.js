'use strict';

var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var async = require('async');
var Canvas = require('canvas');
var scissors = require('scissors');
var wkhtmltopdf = require('wkhtmltopdf');
var spawn = require('child_process').spawn;

var config = require('../config/environment');

var debug = false;

function printDebug(str, obj) {
  if (debug) {
    console.log(str);
    if (obj) console.log(obj);
  }
}

exports.make = function (request, user, recapitulatifHtml, done) {
  printDebug('makePdf: Transforming html to pdf');
  if (request.mdph === '59' && user.role === 'adminMdph') {

    var requestTempPdfPath = computeTempPdfPath(request.shortId);
    var requestBuffer = wkhtmltopdf(recapitulatifHtml, {encoding: 'UTF-8', output: requestTempPdfPath});
    printDebug('make: Transforming for GED_59');

    async.waterfall([
      // Transform everything to pdf stream
      function(cb){
        if (request.documents) {
          return transformDocumentListToPdf(request.documents, [], cb);
        }

        cb(null, []);
      },
      // Group documents by section
      function(documentList, cb) {
        if (documentList.length > 0) {
          return groupDocumentList(documentList, cb);
        }

        cb(null, {});
      },
      // Join everything in one stream
      function(groups, cb){

        var pdfStructure = [
          getSeparatorPath('sep_cerfa.pdf'),
          requestTempPdfPath
        ];

        groups.forEach(function(group) {
          if (group.documentList.length > 0) {
            var separator = getSeparatorPath(group.separator);
            pdfStructure.push(separator);
            group.documentList.forEach(function(document) {
              if (document.tempPdfPath) {
                pdfStructure.push(document.tempPdfPath);
              } else {
                pdfStructure.push(document.actualPdfPath);
              }
            });
          }
        });

        return cb(null, pdfStructure);
      },
      // Load everything in scissors
      function(structure, cb){
        var scissorsStructure = _.map(structure, function(document) {
          return scissors(document);
        });

        printDebug('make: finished building structure:', scissorsStructure);
        cb(null, scissorsStructure);
      }
    ], function (err, scissorsStructure) {
      if (err) return done(err);
      printDebug('make: finished building pdf');

      var stream = scissors
        .join.apply(scissors, scissorsStructure)
        .pdfStream()
      return done(null, stream);
    });
  } else {
    printDebug('make: No transformation required, returning answers as PDF');

    var stream = wkhtmltopdf(recapitulatifHtml, {encoding: 'UTF-8'});
    return done(null, stream);
  }
}

// function compress(input, output, done) {
//   printDebug('compress:', output);

//   var gs = spawn('gs', [
//     '-sDEVICE=pdfwrite',
//     '-dCompatibilityLevel=1.5',
//     '-dPDFSETTINGS=/screen',
//     '-dNOPAUSE',
//     '-dBATCH',
//     '-dQUIET',
//     '-sOutputFile=' + output,
//     input
//   ]);

//   var stdout = '';

//   gs.stdout.on('data', function(chunk) {
//     stdout += chunk.toString();
//   });

//   gs.on('error', function(err) {
//     done(err);
//   });

//   gs.on('close', function(code) {
//     printDebug('compress: finished');
//     done(null, output);
//   });
// }

function transformDocumentListToPdf(documentList, documentListAsPdf, done) {
  printDebug('transformDocumentListToPdf: Transforming: ', documentList);
  if (documentList.length > 0) {
    var document = documentList.pop();
    return transformDocumentToPdf(document, function(err, tempPdfPath, actualPdfPath) {
      if (err) {
        return done(err);
      }
      document.tempPdfPath = tempPdfPath;
      document.actualPdfPath = actualPdfPath;
      documentListAsPdf.push(document);
      return transformDocumentListToPdf(documentList, documentListAsPdf, done)
    });
  } else {
    printDebug('transformDocumentListToPdf: Finished: ', documentListAsPdf);
    return done(null, documentListAsPdf);
  }
}

function transformDocumentToPdf(document, done) {
  printDebug('transformDocumentToPdf: transforming: ', document);
  var documentPath = path.join(config.root + '/server/uploads/', document.name);

  if (document.mimetype !== 'application/pdf') {
    fs.readFile(documentPath, function(err, documentStream) {
      if (err) {
        return done(err);
      }

      var img = new Canvas.Image();
      img.dataMode = Canvas.Image.MODE_MIME | Canvas.Image.MODE_IMAGE; // Both are tracked
      img.src = documentStream;

      var width = img.width / 10;
      var height = img.height / 10;
      var canvas = new Canvas(width, height, 'pdf');
      var ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, width, height);

      var tempPdfPath = computeTempPdfPath(document.name);

      return fs.writeFile(tempPdfPath, canvas.toBuffer('image/jpeg'), function(err) {
        done(err, tempPdfPath, null);
      });
    });
  } else {
    return done(null, null, documentPath);
  }
}

function computeTempPdfPath(document) {
  printDebug('computeTempPdfPath: ', document);
  return path.join(config.root, '/server/uploads/temp/', document + '.pdf');
}

function groupDocumentList(documentList, done) {
  var groupsFor59 = [
    {
      separator: 'sep_justificatifs.pdf',
      category: 'justificatifs',
      documentList: []
    },
    {
      separator: 'sep_certificat.pdf',
      category: 'certificat',
      documentList: []
    },
    {
      separator: 'sep_autres_bilans_medicaux.pdf',
      category: 'autres_bilans_medicaux',
      documentList: []
    },
    {
      separator: 'sep_scolarite.pdf',
      category: 'scolarite',
      documentList: []
    },
    {
      separator: 'sep_vie_pro.pdf',
      category: 'vie_pro',
      documentList: []
    },
    {
      separator: 'sep_bilan_ems_sms.pdf',
      category: 'bilan_ems_sms',
      documentList: []
    },
    {
      separator: 'sep_autres.pdf',
      category: 'autres',
      documentList: []
    }
  ];

  var groupsFor59ByIdx = _.indexBy(groupsFor59, 'category');

  documentList.forEach(function(document) {
    if (groupsFor59ByIdx[document.category]) {
      groupsFor59ByIdx[document.category].documentList.push(document);
    } else {
      groupsFor59ByIdx.autres.documentList.push(document);
    }
  });

  done(null, groupsFor59);
}

function getSeparatorPath(separator) {
  return path.join(config.root, '/server/components/pdf_templates/', separator);
}
