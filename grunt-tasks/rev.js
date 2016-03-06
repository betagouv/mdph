module.exports = {
  dist: {
    files: {
      src: [
        '<%= app.dirs.dist %>/<%= app.dirs.client %>/!(bower_components){,*/}*.{js,css}',
        '<%= app.dirs.dist %>/<%= app.dirs.client %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
        '<%= app.dirs.dist %>/<%= app.dirs.client %>/assets/fonts/*'
      ]
    }
  }
};
