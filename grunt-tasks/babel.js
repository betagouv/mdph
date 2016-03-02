module.exports = {
  options: {
    sourceMap: true,
    optional: [
      'es7.classProperties'
    ]
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
    options: {
      optional: ['runtime']
    },
    files: [{
      expand: true,
      cwd: 'server',
      src: ['**/*.js'],
      dest: 'dist/server'
    }]
  }
};
