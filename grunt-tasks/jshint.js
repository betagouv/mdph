module.exports = {
  options: {
    jshintrc: '<%= app.dirs.client %>/.jshintrc',
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
