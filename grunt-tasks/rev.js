module.exports = {
  dist: {
    files: {
      src: [
        '<%= app.dirs.dist %>/{,*/}*.js',
        '<%= app.dirs.dist %>/{,*/}*.css',
        '<%= app.dirs.dist %>/assets/fonts/*',
        '!<%= app.dirs.dist %>/server/*'
      ]
    }
  }
};
