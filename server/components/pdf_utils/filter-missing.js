/*jslint bitwise: true */

'use strict';

import tmp from 'tmp';
import {spawn} from 'child_process';
import path from 'path';
import Promise from 'bluebird';
import fs from 'fs';

export default function(fileList) {
  return Promise.map(fileList, (file) => {
    const filepath = file.path;
    return new Promise((resolve, reject) => {
      fs.access(filepath, fs.F_OK, error => {
        if (error) {
          file.path = path.join(__dirname, 'error.pdf');
        }

        return resolve(file);
      });
    });
  });
}
