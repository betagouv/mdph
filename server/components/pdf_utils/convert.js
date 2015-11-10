/*jslint bitwise: true */

'use strict';

var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var async = require('async');
var spawn = require('child_process').spawn;

var endsWith = function(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var isPdf = function(file) {
  return endsWith(file.mimetype, 'pdf') || endsWith(file.originalname, 'pdf');
};

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

    async.map(fileList, _convertSingle.bind(null, outputDir), callback);
  };

  var _convertSingle = function(outputDir, file, done) {
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

    var localPath = path.join(_this.rootPath, path.basename(file.path));

    if (isPdf(file)) {
      file.path = localPath;
      return done(null, file);
    }

    var outputPath = path.join(outputDir, path.basename(file.path)) + '.pdf';
    console.log(outputPath);

    var args = [localPath, '-compress', 'jpeg', '-gravity', 'center', '-resize', '1140x1653', '-extent', '1240x1753',
      '-units', 'PixelsPerInch', '-density', '150x150', outputPath];
    var convert = spawn('convert', args);

    convert.on('exit', function(code) {
      file.path = outputPath;
      done(null, file);
    });
  };

  /*
   * Expose public API calls
   */
  this.convertList = convertList;
  return this;
};

module.exports = PdfConvert;
