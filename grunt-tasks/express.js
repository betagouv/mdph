module.exports = {
  options: {
    port: '<%= app.port %>'
  },
  dev: {
    options: {
      script: '<%= app.dirs.server %>',
      debug: true
    }
  },
  prod: {
    options: {
      script: '<%= app.dirs.dist %>/<%= app.dirs.server %>'
    }
  }
};
