var Imagemin = require('imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

module.exports = function(file, done) {
  if (file.mimetype === 'image/jpeg') {
    new Imagemin()
      .src(file.path)
      .dest(file.destination)
      .use(imageminJpegRecompress({
        progressive: true,
        loops: 7,
        min: 30,
        strip: true,
        quality: 'low',
        target: 0.7
      }))
      .run();
  }

  done();
};
