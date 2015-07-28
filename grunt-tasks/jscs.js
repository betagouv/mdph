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
    '<%= app.dirs.client %>/{app,components}/**/*.js',
    '!<%= app.dirs.client %>/{app,components}/**/*.spec.js',
    '!<%= app.dirs.client %>/{app,components}/**/*.mock.js'
  ],
  test: {
    src: [
      '<%= app.dirs.client %>/{app,components}/**/*.spec.js',
      '<%= app.dirs.client %>/{app,components}/**/*.mock.js'
    ]
  }
};
