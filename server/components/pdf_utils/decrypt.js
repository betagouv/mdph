/*jslint bitwise: true */

'use strict';

import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import async from 'async';
import Promise from 'bluebird';
import {spawn} from 'child_process';

function decryptSingle(outputDir) {
  return function(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        throw new Error('File not found.');
      }

      if (typeof file.mimetype !== 'string') {
        throw new Error('Property \'mimetype\' not found.');
      }

      if (typeof file.path !== 'string') {
        throw new Error('Property \'path\' not found.');
      }

      if (typeof outputDir !== 'string') {
        throw new Error('No output directory.');
      }

      if (!isPdf(file)) {
        return resolve(file);
      }

      var outputPath = path.join(outputDir, '_decrypted' + path.basename(file.path));
      var args = ['--decrypt', file.path, outputPath];
      var decrypt = spawn('qpdf', args);

      decrypt.stderr.on('data', function(data) {
        console.log('decrypt encountered an error:\n', String(data));
        return reject(file);
      });

      decrypt.on('exit', function(code) {
        file.path = outputPath;
        return resolve(file);
      });
    });
  };
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isPdf(file) {
  return endsWith(file.mimetype, 'pdf') || endsWith(file.originalname, 'pdf');
}

export default function(outputDir, fileList) {
  if (fileList.constructor !== Array) {
    throw new Error('Need an array of documents.');
  }

  if (typeof outputDir !== 'string') {
    throw new Error('No output directory.');
  }

  return Promise.map(fileList, decryptSingle(outputDir));
}
