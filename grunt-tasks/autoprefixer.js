module.exports = {
  options: {
    browsers: ['last 1 version']
  },
  dist: {
    files: [{
      expand: true,
      cwd: '.tmp/',
      src: '{,*/}*.css',
      dest: '.tmp/'
    }]
  }
};
