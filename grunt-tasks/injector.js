'use strict';

module.exports = {
  options: {},

  // Inject application script files into index.html (doesn't include libs)
  scripts: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/', '');
        filePath = filePath.replace('/.tmp/', '');
        return '<script src="' + filePath + '"></script>';
      },

      sort: function(a, b) {
        var module = /\.module\.js$/;
        var aMod = module.test(a);
        var bMod = module.test(b);

        // inject *.module.js first
        return (aMod === bMod) ? 0 : (aMod ? -1 : 1);
      },

      starttag: '<!-- injector:js -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      'client/index.html': [
           [
             'client/{app,components}/**/!(*.spec|*.mock).js',
             '!{.tmp,client}/app/app.{js,ts}'
           ]
        ]
    }
  },

  // Inject component scss into app.scss
  sass: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/app/', '');
        filePath = filePath.replace('/client/components/', '../components/');
        return '@import \'' + filePath + '\';';
      },

      starttag: '// injector',
      endtag: '// endinjector'
    },
    files: {
      'client/app/app.scss': [
        'client/{app,components}/**/*.{scss,sass}',
        '!client/app/app.{scss,sass}'
      ]
    }
  },

  // Inject component css into index.html
  css: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/', '');
        filePath = filePath.replace('/.tmp/', '');
        return '<link rel="stylesheet" href="' + filePath + '">';
      },

      starttag: '<!-- injector:css -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      'client/index.html': [
        'client/{app,components}/**/*.css'
      ]
    }
  }
};
