/*jslint bitwise: true */

'use strict';

import tmp from 'tmp';
import {spawn} from 'child_process';
import fs from 'fs';
import path from 'path';

export default function(fileList, directory) {
  return new Promise((resolve, reject) => {
    tmp.file({dir: directory, keep: true}, (err, tempFilePath) => {
      if (err) {
        return reject(err);
      }

      const args = fileList.concat(['cat', 'output', tempFilePath]);
      const pdftk = spawn('pdftk', args);

      pdftk.stderr.on('data', function(data) {
        // TODO log and return error in pdf
        if (process.env.NODE_ENV !== 'test') {
          console.log('pdftk encountered an error:\n', String(data));
        }

        return resolve(path.join(__dirname, 'pdf-sample.pdf'));
      });

      pdftk.on('exit', function() {
        return resolve(tempFilePath);
      });
    });
  });
}
