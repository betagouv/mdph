module.exports = {
  dist: {
    files: {
      src: [
        'dist/client/!(lib){,*/}*.{js,css}',
        'dist/client/assets/fonts/*'
      ]
    }
  }
};
