module.exports = {
  injectJS: {
    files: [
      '<%= app.dirs.client %>/{app,components}/**/*.js',
      '!<%= app.dirs.client %>/{app,components}/**/*.spec.js',
      '!<%= app.dirs.client %>/{app,components}/**/*.mock.js',
      '!<%= app.dirs.client %>/app/app.js'],
    tasks: ['injector:scripts']
  },
  injectCss: {
    files: [
      '<%= app.dirs.client %>/{app,components}/**/*.css'
    ],
    tasks: ['injector:css']
  },
  mochaTest: {
    files: ['server/**/*.spec.js'],
    tasks: ['env:test', 'mochaTest']
  },
  jsTest: {
    files: [
      '<%= app.dirs.client %>/{app,components}/**/*.spec.js',
      '<%= app.dirs.client %>/{app,components}/**/*.mock.js'
    ],
    tasks: ['newer:jshint:all', 'karma']
  },
  injectSass: {
    files: [
      '<%= app.dirs.client %>/{app,components}/**/*.{scss,sass}'],
    tasks: ['injector:sass']
  },
  sass: {
    files: [
      '<%= app.dirs.client %>/{app,components}/**/*.{scss,sass}'],
    tasks: ['sass', 'autoprefixer']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    files: [
      '{.tmp,<%= app.dirs.client %>}/{app,components}/**/*.css',
      '{.tmp,<%= app.dirs.client %>}/{app,components}/**/*.html',
      '{.tmp,<%= app.dirs.client %>}/{app,components}/**/*.js',
      '!{.tmp,<%= app.dirs.client %>}{app,components}/**/*.spec.js',
      '!{.tmp,<%= app.dirs.client %>}/{app,components}/**/*.mock.js',
      '<%= app.dirs.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    options: {
      livereload: true
    }
  },
  express: {
    files: [
      'server/**/*.{js,json}'
    ],
    tasks: ['express:dev', 'wait'],
    options: {
      livereload: true,
      nospawn: true //Without this option specified express won't be reloaded
    }
  }
};
