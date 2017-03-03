module.exports = {
  options: {
    sourceMap: true,
    includePaths: [
      'client/lib',
      'client/app',
      'client/components'
    ]
  },
  dist: {
    files: [{
      expand: true,
      cwd: 'client',
      src: 'app/app.scss',
      dest: '.tmp/',
      ext: '.css'
    }]
  }
};
