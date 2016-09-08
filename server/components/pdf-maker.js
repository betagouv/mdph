import Promise from 'bluebird';
import tmp from 'tmp';
import path from 'path';
import htmlToPdf from 'html-pdf';
import pdfConvert from './pdf_utils/convert';
import pdfJoin from './pdf_utils/join';
import pdfBuild from './pdf_structure/build';
import pdfDecrypt from './pdf_utils/decrypt';
import writeGridfsToFile from './pdf_structure/writeGridfsToFile';
import Recapitulatif from './recapitulatif';

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

function buildStructure(request, recapitulatifPdfPath) {
  return function(convertedDocumentList) {
    return pdfBuild(request.mdph, recapitulatifPdfPath, convertedDocumentList);
  };
}

function writeCategoriesSeparatorsToFile(tempDirPath) {
  return function(pdfStructure) {
    return writeGridfsToFile(pdfStructure, tempDirPath);
  };
}

function transformImagesToPdf(tempDirPath, request) {
  return pdfConvert(tempDirPath, request.documents);
}

function joinPdfStructureInOneFile(tempDirPath) {
  return function(pdfStructure) {
    return pdfJoin(pdfStructure, tempDirPath);
  };
}

function createStructuredRequestPdf({tempDirPath, recapitulatifPdfPath, request}) {
  return transformImagesToPdf(tempDirPath, request)
    .then(() => pdfDecrypt(tempDirPath, request.documents))
    .then(buildStructure(request, recapitulatifPdfPath))
    .then(writeCategoriesSeparatorsToFile(tempDirPath))
    .then(joinPdfStructureInOneFile(tempDirPath));
}

function createRequestPdf({role, request, host, tempDirPath}) {
  return new Promise(function(resolve, reject) {
    Recapitulatif.answersToHtml({request, host}, (err, recapitulatifHtml) => {
      if (err) {
        return reject(err);
      }

      let recapitulatifPdfPath = path.join(tempDirPath, `${request.shortId}.pdf`);

      htmlToPdf.create(recapitulatifHtml, pdfOptions).toFile(recapitulatifPdfPath, (err, file) => {
        if (err) {
          return reject(err);
        }

        if (role !== 'user') {
          return createStructuredRequestPdf({tempDirPath, recapitulatifPdfPath, request}).then(pdfPath => {
            return resolve(pdfPath);
          });
        }

        return resolve(recapitulatifPdfPath);
      });
    });
  });
}

export default function({request, host, role}) {
  var dirPromise = dir({unsafeCleanup: true, keep: true});
  return Promise.using(dirPromise, tempDirPath  => {
    return createRequestPdf({tempDirPath, request, host, role});
  });
}
