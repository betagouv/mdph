module.exports = {
  babel: {
    files: ['<%= app.dirs.client %>/{app,components}/**/!(*.spec|*.mock).js'],
    tasks: ['newer:babel:client']
  },
  injectJS: {
    files: [
      '<%= app.dirs.client %>/{app,components}/**/!(*.spec|*.mock).js',
      '!<%= app.dirs.client %>/app/app.js'
    ],
    tasks: ['injector:scripts']
  },
  injectCss: {
    files: ['<%= app.dirs.client %>/{app,components}/**/*.css'],
    tasks: ['injector:css']
  },
  mochaTest: {
    files: ['server/**/*.spec.js'],
    options: {
      spawn: false
    },
    tasks: ['env:test', 'mochaTest']
  },
  jsTest: {
    files: ['<%= app.dirs.client %>/{app,components}/**/*.{spec,mock}.js'],
    tasks: ['newer:jshint:all', 'wiredep:test', 'karma']
  },
  injectSass: {
    files: [
      '<%= app.dirs.client %>/{app,components}/**/*.{scss,sass}'],
    tasks: ['injector:sass']
  },
  sass: {
    files: [
      '<%= app.dirs.client %>/{app,components}/**/*.{scss,sass}'],
    tasks: ['sass', 'postcss']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    files: [
      '{.tmp,<%= app.dirs.client %>}/{app,components}/**/*.{css,html}',
      '{.tmp,<%= app.dirs.client %>}/{app,components}/**/!(*.spec|*.mock).js',
      '<%= app.dirs.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    options: {
      livereload: true
    }
  },
  express: {
    files: ['server/**/*.{js,json}'],
    tasks: ['express:dev', 'wait'],
    options: {
      livereload: true,
      spawn: false //Without this option specified express won't be reloaded
    }
  },
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  }
};
