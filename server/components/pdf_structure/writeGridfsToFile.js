'use strict';

import _ from 'lodash';
import {createWriteStream} from 'fs';
import tmp from 'tmp';
import Promise from 'bluebird';
import {Readable} from 'stream';

export default function(pdfStructure, directory) {
  return Promise.map(pdfStructure, function(currentFile) {
    return new Promise((resolve, reject) => {
      if (currentFile instanceof Readable) {

        // currentFile is a GridReadStream
        tmp.file({dir: directory, keep: true}, (err, tempFilePath) => {
          if (err) {
            return reject(err);
          }

          let writeStream = createWriteStream(tempFilePath);
          currentFile.pipe(writeStream);

          writeStream.on('finish', function() {
            return resolve(tempFilePath);
          });

          writeStream.on('error', reject);
        });
      } else {
        return resolve(currentFile);
      }
    });
  });
}
