module.exports = {
  babel: {
    files: ['client/{app,components}/**/!(*.spec|*.mock).js'],
    tasks: ['newer:babel:client']
  },
  injectJS: {
    files: [
      'client/{app,components}/**/!(*.spec|*.mock).js',
      '!client/app/app.js'
    ],
    tasks: ['injector:scripts']
  },
  injectCss: {
    files: ['client/{app,components}/**/*.css'],
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
    files: ['client/{app,components}/**/*.{spec,mock}.js'],
    tasks: ['newer:jshint:all', 'wiredep:test', 'karma']
  },
  injectSass: {
    files: [
      'client/{app,components}/**/*.{scss,sass}'],
    tasks: ['injector:sass']
  },
  sass: {
    files: [
      'client/{app,components}/**/*.{scss,sass}'],
    tasks: ['sass', 'postcss']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    files: [
      '{.tmp,client}/{app,components}/**/*.{css,html}',
      '{.tmp,client}/{app,components}/**/!(*.spec|*.mock).js',
      'client/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
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
