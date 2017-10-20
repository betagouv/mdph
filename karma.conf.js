// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [

      // bower:js
      'client/lib/angular/angular.min.js',
      'client/lib/angular/angular-locale_fr-fr.js',
      'client/lib/angular/angular-aria.min.js',
      'client/lib/angular/angular-cookies.min.js',
      'client/lib/angular/angular-messages.min.js',
      'client/lib/angular/angular-resource.min.js',
      'client/lib/angular/angular-sanitize.min.js',
      'client/lib/angular-chart.js/Chart.min.js',
      'client/lib/angular-chart.js/angular-chart.min.js',
      'client/lib/angular-toastr/angular-toastr.tpls.min.js',
      'client/lib/angular-ui-mask/mask.min.js',
      'client/lib/angular-ui-router/angular-ui-router.min.js',
      'client/lib/angular-ui-tree/angular-ui-tree.min.js',
      'client/lib/jquery/jquery.min.js',
      'client/lib/lodash/lodash.min.js',
      'client/lib/mapbox.js/mapbox.js',
      'client/lib/moment/moment.min.js',
      'client/lib/moment/fr.js',
      'client/lib/ng-file-upload/ng-file-upload-all.min.js',
      'client/lib/ngstorage/ngStorage.min.js',
      'client/lib/ui-bootstrap/ui-bootstrap-tpls-0.13.3.min.js',
      'client/lib/angular/angular-mocks.js',
      'client/lib/angular/angular-scenario.js',
      'client/lib/zxcvbn/zxcvbn.js',
      'client/lib/zxcvbn/angular-zxcvbn.min.js',

      // endbower
      'client/app/app.js',
      'client/{app,components}/**/*.module.js',
      'client/{app,components}/**/*.js',
      'client/{app,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
      'client/{app,components}/**/*.js': ['babel'],
      'client/{app,components}/**/!(*spec).js': ['coverage'],
    },


    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },

      sourceFileName: function(file) {
        return file.originalPath;
      }
    },

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'text-summary'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
