module.exports = {
  options: {
    port: '<%= app.port %>'
  },
  dev: {
    options: {
      script: 'server',
      debug: true
    }
  },
  prod: {
    options: {
      script: 'dist/server'
    }
  }
};
