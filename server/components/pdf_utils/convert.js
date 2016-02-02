/*jslint bitwise: true */

'use strict';

var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var async = require('async');
var spawn = require('child_process').spawn;

function convertSingle(outputDir, rootPath, file, done) {
  done = done || _.noop;

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

  var filePath = path.join(rootPath, path.basename(file.path));

  if (isPdf(file)) {
    file.path = filePath;
    return done(null, file);
  }

  var outputPath = path.join(outputDir, path.basename(file.path)) + '.pdf';
  var args = [filePath, '-compress', 'jpeg', '-gravity', 'center', '-resize', '1140x1653', '-extent', '1240x1753',
    '-units', 'PixelsPerInch', '-density', '150x150', outputPath];
  var convert = spawn('convert', args);

  convert.on('exit', function(code) {
    file.path = outputPath;
    done(null, file);
  });
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isPdf(file) {
  return endsWith(file.mimetype, 'pdf') || endsWith(file.originalname, 'pdf');
}

var PdfConvert = function(rootPath) {

  if (!(this instanceof PdfConvert)) {
    return new PdfConvert(rootPath);
  }

  this.rootPath = rootPath;
  var _this = this;

  var convertList = function(outputDir, fileList, callback) {
    callback = callback || function() { };

    if (fileList.constructor !== Array) {
      throw new Error('Need an array of documents.');
    }

    if (typeof outputDir !== 'string') {
      throw new Error('No output directory.');
    }

    async.map(fileList, convertSingle.bind(null, outputDir, rootPath), callback);
  };

  /*
   * Expose public API calls
   */
  this.convertList = convertList;
  return this;
};

module.exports = PdfConvert;
