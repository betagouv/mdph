module.exports = {
  options: {
    port: '<%= app.port %>'
  },
  dev: {
    options: {
      script: 'server/app.js',
      debug: true
    }
  },
  prod: {
    options: {
      script: 'server/app.js'
    }
  }
};
