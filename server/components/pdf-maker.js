import Promise from 'bluebird';
import tmp from 'tmp';
import path from 'path';
import htmlToPdf from 'html-pdf';
import pdfConvert from './pdf_utils/convert';
import pdfJoin from './pdf_utils/join';
import pdfArchive from './pdf_utils/archive';
import pdfBuild from './pdf_structure/build';
import pdfDecrypt from './pdf_utils/decrypt';
import pdfFilterMissing from './pdf_utils/filter-missing';
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

function createRequestArchive(tempDirPath) {
  return function(pdfStructure) {
    return pdfArchive(pdfStructure, tempDirPath);
  };
}

function createRequestWithFiles({tempDirPath, recapitulatifPdfPath, request, requestExportFormat}) {
  return transformImagesToPdf(tempDirPath, request)
    .then(() => pdfDecrypt(tempDirPath, request.documents))
    .then(() => pdfFilterMissing(request.documents))
    .then(buildStructure(request, recapitulatifPdfPath))
    .then(writeCategoriesSeparatorsToFile(tempDirPath))
    .then((pdfStructure) => {
      if (requestExportFormat === 'zip') {
        return Promise.resolve(createRequestArchive(tempDirPath)(pdfStructure));
      } else {
        return Promise.resolve(joinPdfStructureInOneFile(tempDirPath)(pdfStructure));
      }
  });
}

function createRequestExport({role, request, host, tempDirPath, requestExportFormat}) {
  return new Promise(function(resolve, reject) {
    Recapitulatif.answersToHtml({request, host}, (err, recapitulatifHtml) => {
      if (err) {
        return reject(err);
      }

      let recapitulatifPdfPath = path.join(tempDirPath, `${request.shortId}.pdf`);

      htmlToPdf.create(recapitulatifHtml, pdfOptions).toFile(recapitulatifPdfPath, (err) => {
        if (err) {
          return reject(err);
        }

        if (role !== 'user') {
          return createRequestWithFiles({tempDirPath, recapitulatifPdfPath, request, requestExportFormat}).then(stream => {
            if (requestExportFormat === 'pdf') {
              return resolve(stream.path);
            }
            return resolve(stream);
          });
        }
        return resolve(recapitulatifPdfPath);
      });
    });
  });
}

export default function({request, host, role, requestExportFormat}) {
  var dirPromise = dir({unsafeCleanup: true, keep: true});
  return Promise.using(dirPromise, tempDirPath  => {
    return createRequestExport({tempDirPath, request, host, role, requestExportFormat});
  });
}
