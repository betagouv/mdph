module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '.tmp/concat',
      src: '*/**.js',
      dest: '.tmp/concat'
    }]
  }
};
