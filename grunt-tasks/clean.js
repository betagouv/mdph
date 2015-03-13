module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= app.dirs.dist %>/*',
      ]
    }]
  },
  server: '.tmp'
};
