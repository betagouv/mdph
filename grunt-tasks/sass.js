module.exports = {
  server: {
    options: {
      loadPath: [
        'client/lib',
        'client/app',
        'client/components'
      ],
      compass: false
    },
    files: {
      '.tmp/app/app.css': 'client/app/app.scss'
    }
  }
};
