/*jslint bitwise: true */

'use strict';

import path from 'path';
import Promise from 'bluebird';
import {spawn} from 'child_process';
import {uploadDir} from '../../config/environment';

function convertSingle(outputDir) {
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

      var currentFilePath = path.join(uploadDir, path.basename(file.path));

      if (isPdf(file)) {
        file.path = currentFilePath;
        return resolve(file);
      }

      var outputPath = path.join(outputDir, path.basename(file.path)) + '.pdf';
      var args = [currentFilePath, '-compress', 'jpeg', '-gravity', 'center', '-resize', '1140x1653', '-extent', '1240x1753',
        '-units', 'PixelsPerInch', '-density', '150x150', outputPath];
      var convert = spawn('convert', args);

      convert.on('exit', function(code) {
        file.path = outputPath;
        resolve(file);
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

  return Promise.map(fileList, convertSingle(outputDir));
}
