
import Promise from 'bluebird';
import tmp from 'tmp';
import path from 'path';
import htmlToPdf from 'html-pdf';
import Handlebars from 'handlebars';
import syntheseHtml from './synthese';

const options = {
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

function build({synthese, host, tempDirPath}) {
  return new Promise(function(resolve, reject) {
    syntheseHtml({synthese, host}, (err, content) => {
      if (err) {
        return reject(err);
      }

      let pdfPath = path.join(tempDirPath, `${synthese._id}.pdf`);

      htmlToPdf.create(content, options).toFile(pdfPath, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve(pdfPath);
      });
    });
  });
}

export default function({synthese, host}) {
  var dirPromise = dir({unsafeCleanup: true, keep: true});
  return Promise.using(dirPromise, tempDirPath  => {
    return build({synthese, host, tempDirPath});
  });
}
