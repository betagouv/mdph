module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= app.dirs.client %>/assets/images',
      src: '{,*/}*.{png,jpg,jpeg,gif,svg}',
      dest: '<%= app.dirs.dist %>/<%= app.dirs.client %>/assets/images'
    }]
  }
};
