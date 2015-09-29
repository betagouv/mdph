/*jslint bitwise: true */

'use strict';

var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var async = require('async');
var Canvas = require('canvas');

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

  var _convertSingle = function(outputDir, file, callback) {
    callback = callback || function() { };

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

    if (file.mimetype === 'application/pdf') {
      file.path = localPath;
      return callback(null, file);
    }

    fs.readFile(localPath, function(err, data) {
      if (err) {
        return callback(err);
      }

      data = convertDataToPDF(data);
      file.path = path.join(outputDir, path.basename(file.path));

      fs.writeFile(file.path, data, function(err) {
        return callback(err, file);
      });
    });
  };

  var convertDataToPDF = function(data) {
    var img = new Canvas.Image();
    img.dataMode = Canvas.Image.MODE_MIME | Canvas.Image.MODE_IMAGE;
    img.src = data;

    var width = img.width / 2;
    var height = img.height / 2;
    var canvas = new Canvas(width, height, 'pdf');
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toBuffer('image/jpeg');
  };

  /*
   * Expose public API calls
   */
  this.convertList = convertList;
  return this;
};

module.exports = PdfConvert;
