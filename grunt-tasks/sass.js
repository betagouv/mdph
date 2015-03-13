module.exports = {
  server: {
    options: {
      loadPath: [
        '<%= app.dirs.client %>/bower_components',
        '<%= app.dirs.client %>/app',
        '<%= app.dirs.client %>/components'
      ],
      compass: false
    },
    files: {
      '.tmp/app/app.css' : '<%= app.dirs.client %>/app/app.scss'
    }
  }
};
