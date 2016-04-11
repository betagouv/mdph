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
    options: {
      plugins: [
        'transform-class-properties',
        'transform-runtime'
      ]
    },
    files: [{
      expand: true,
      cwd: 'server',
      src: ['**/*.js'],
      dest: 'dist/server'
    }]
  }
};
