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
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-aria/angular-aria.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/Chart.js/Chart.js',
      'client/bower_components/angular-chart.js/dist/angular-chart.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-messages/angular-messages.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/lodash/lodash.js',
      'client/bower_components/moment/moment.js',
      'client/bower_components/ng-file-upload/ng-file-upload.js',
      'client/bower_components/ngstorage/ngStorage.js',
      'client/bower_components/angular-ui-tree/dist/angular-ui-tree.js',
      'client/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      'client/bower_components/angular-ui-mask/dist/mask.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-scenario/angular-scenario.js',
      // endbower
      'client/app/app.js',
      'client/{app,components}/**/*.js',
      'client/{app,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'html2js'
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        optional: [
          'es7.classProperties'
        ]
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },

      sourceFileName: function(file) {
        return file.originalPath;
      }
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    ngJade2JsPreprocessor: {
      stripPrefix: 'client/'
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
