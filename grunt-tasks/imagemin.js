module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= app.dirs.client %>/assets/images',
      src: '{,*/}*.{png,jpg,jpeg,gif}',
      dest: '<%= app.dirs.dist %>/assets/images'
    }]
  }
};
