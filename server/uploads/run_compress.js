#!/usr/bin/env node

var Imagemin = require('imagemin');
var fs = require('fs');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var path = require('path');

fs.readdir('.', function(err, files) {
  files.forEach(function(file) {
    if (path.extname(file) === '.jpg' || path.extname(file) === '.jpeg') {
      new Imagemin()
        .src(file)
        .dest(__dirname + '/compressed')
        .use(imageminJpegRecompress({
          progressive: true,
          loops: 7,
          min: 30,
          strip: true,
          quality : 'low',
          target : 0.7
        }))
        .run();
    }
  })

})
