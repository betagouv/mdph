module.exports = {
  options: {
    jshintrc: 'client/.jshintrc',
    reporter: require('jshint-stylish')
  },
  server: {
    options: {
      jshintrc: 'server/.jshintrc'
    },
    src: [
      'server/**/*.js',
      '!server/**/*.spec.js',
      '!server/test/**/*.js'
    ]
  },
  serverTest: {
    options: {
      jshintrc: 'server/.jshintrc'
    },
    src: ['server/**/*.{spec,integration}.js', 'server/test/**/*.js']
  },
  all: [
    'client/{app,components}/**/*.js',
    '!client/{app,components}/**/*.spec.js',
    '!client/{app,components}/**/*.mock.js'
  ],
  test: {
    src: [
      'client/{app,components}/**/*.spec.js',
      'client/{app,components}/**/*.mock.js'
    ]
  }
};
