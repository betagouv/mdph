module.exports = {
  options: {
    config: '.jscsrc'
  },
  server: {
    src: [
      'server/**/*.js',
      '!server/**/*.spec.js'
    ]
  },
  serverTest: {
    src: ['server/**/*.spec.js']
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
