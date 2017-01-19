module.exports = {
  dist: {
    files: {
      src: [
        'dist/client/!(bower_components){,*/}*.{js,css}',
        'dist/client/assets/fonts/*'
      ]
    }
  }
};
