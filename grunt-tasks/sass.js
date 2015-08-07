module.exports = {
  server: {
    options: {
      includePaths: [
        '<%= app.dirs.client %>/bower_components',
        '<%= app.dirs.client %>/app',
        '<%= app.dirs.client %>/components'
      ]
    },
    files: [{
      expand: true,
      cwd: '<%= app.dirs.client %>',
      src: 'app/app.scss',
      dest: '.tmp/',
      ext: '.css'
    }]
  }
};
