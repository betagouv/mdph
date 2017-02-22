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
  }
};
