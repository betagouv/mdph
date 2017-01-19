module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: 'client/assets/images',
      src: '{,*/}*.{png,jpg,jpeg,gif,svg}',
      dest: 'dist/client/assets/images'
    }]
  }
};
