module.exports = {
  options: {
    sourceMap: true
  },
  client: {
    files: [{
      expand: true,
      cwd: 'client',
      src: ['{app,components}/**/!(*.spec).js'],
      dest: '.tmp'
    }]
  },
  server: {
    files: [{
      expand: true,
      cwd: 'server',
      src: ['**/*.js'],
      dest: 'dist/server'
    }]
  }
};
