'use strict';

import {createWriteStream} from 'fs';
import tmp from 'tmp';
import Promise from 'bluebird';
import {Readable} from 'stream';

export default function(pdfStructure, directory) {
  return Promise.map(pdfStructure, function(currentFile) {
    const currentFilePath = currentFile.path;

    return new Promise((resolve, reject) => {
      if (currentFilePath instanceof Readable) {

        // currentFilePath is a GridReadStream
        tmp.file({dir: directory, keep: true}, (err, tempFilePath) => {
          if (err) {
            return reject(err);
          }

          let writeStream = createWriteStream(tempFilePath);
          currentFilePath.pipe(writeStream);

          writeStream.on('finish', function() {
            return resolve({name: currentFile.name, path: tempFilePath});
          });

          writeStream.on('error', reject);
        });
      } else {
        return resolve({name: currentFile.name, path: currentFilePath});
      }
    });
  });
}
