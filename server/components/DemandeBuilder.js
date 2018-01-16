import Promise from 'bluebird';
import tmp from 'tmp';
import path from 'path';
import htmlToPdf from 'html-pdf';
import convertToPdf from './pdf_utils/convert';
import joinPdf from './pdf_utils/join';
import joinArchive from './pdf_utils/archive';
import pdfBuild from './pdf_structure/build';
import decryptPdf from './pdf_utils/decrypt';
import filterMissingPdf from './pdf_utils/filter-missing';
import writeGridfsToFile from './pdf_structure/writeGridfsToFile';
import recapitulatif from './recapitulatif';

const pdfOptions = {
  format: 'A4',
  border: '.25"',
  footer: {
    height: '40px',
    contents: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>'
  }
};

function dir(opts) {
  var cleanupCallback;
  return new Promise(function(resolve, reject) {
    tmp.dir(opts || {}, function(err, path, callback) {
      cleanupCallback = callback;
      if (err) {
        return reject(err);
      }

      resolve(path);
    });
  })
  .finally(function() {
    cleanupCallback();
    cleanupCallback = null;
  });
}

function buildStructure(request, recapitulatifPdfPath, withSeparator) {
  return function(convertedDocumentList) {
    return pdfBuild(request.mdph, recapitulatifPdfPath, convertedDocumentList, withSeparator);
  };
}

function buildFiles(tempDirPath) {
  return function(pdfStructure) {
    return writeGridfsToFile(pdfStructure, tempDirPath);
  };
}

function imagesToPdf(tempDirPath, request) {
  return convertToPdf(tempDirPath, request.documents);
}

function joinFilesInPdf(tempDirPath) {
  return function(pdfStructure) {
    return joinPdf(pdfStructure, tempDirPath);
  };
}

function joinFilesInArchive(tempDirPath) {
  return function(pdfStructure) {
    return joinArchive(pdfStructure, tempDirPath);
  };
}

function joinFiles({tempDirPath, recapitulatifPdfPath, request, withSeparator, format}) {
  return imagesToPdf(tempDirPath, request)
    .then(() => decryptPdf(tempDirPath, request.documents))
    .then(() => filterMissingPdf(request.documents))
    .then(buildStructure(request, recapitulatifPdfPath, withSeparator))
    .then(buildFiles(tempDirPath))
    .then((pdfStructure) => {
      switch (format) {
        case 'pdf':
          return Promise.resolve(joinFilesInPdf(tempDirPath)(pdfStructure));
        case 'zip':
          return Promise.resolve(joinFilesInArchive(tempDirPath)(pdfStructure));
        default:
          return Promise.reject(new Error('format ' + format + ' non reconnu'));
      }
  });
}

function build({request, host, tempDirPath, withSeparator, format}) {
  return new Promise(function(resolve, reject) {
    recapitulatif({request, host, mdph}, (err, recapitulatifHtml) => {
      if (err) {
        return reject(err);
      }

      let recapitulatifPdfPath = path.join(tempDirPath, `${request.shortId}.pdf`);

      htmlToPdf.create(recapitulatifHtml, pdfOptions).toFile(recapitulatifPdfPath, (err) => {
        if (err) {
          return reject(err);
        }

        return  joinFiles({tempDirPath, recapitulatifPdfPath, request, withSeparator, format}).then(stream => {
          return resolve(stream);
        });

      });
    });
  });
}

export default function({request, host, mdph, withSeparator, format}) {
  var dirPromise = dir({unsafeCleanup: true, keep: true});
  return Promise.using(dirPromise, tempDirPath  => {
    withSeparator = false;
    return build({tempDirPath, request, host, mdph, withSeparator, format});
  });
}
