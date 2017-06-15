/*jslint bitwise: true */

'use strict';

import _ from 'lodash';
import tmp from 'tmp';
import { spawn } from 'child_process';
import path from 'path';
import { createReadStream } from 'fs';

export default function(fileList, directory) {
  return new Promise((resolve, reject) => {
    tmp.file({dir: directory, keep: true}, (err, tempFilePath) => {
      if (err) {
        return reject(err);
      }

      const fileListPaths = _.pluck(fileList, 'path');

      const args = fileListPaths.concat(['cat', 'output', tempFilePath]);
      const pdftk = spawn('pdftk', args);

      pdftk.stderr.on('data', function(data) {
        // TODO log and return error in pdf
        if (process.env.NODE_ENV !== 'test') {
          console.log('pdftk encountered an error:\n', String(data));
        }

        return resolve(path.join(__dirname, 'pdf-sample.pdf'));
      });

      pdftk.on('exit', function() {
        var readStream = createReadStream(tempFilePath);
        return resolve(readStream);
      });
    });
  });
}
