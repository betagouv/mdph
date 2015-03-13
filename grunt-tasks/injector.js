'use strict';

module.exports = {
  options: {

  },
  // Inject application script files into index.html (doesn't include bower)
  scripts: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/', '');
        filePath = filePath.replace('/.tmp/', '');
        return '<script src="' + filePath + '"></script>';
      },
      starttag: '<!-- injector:js -->',
      endtag: '<!-- endinjector -->'
    },
    files: {
      '<%= app.dirs.client %>/index.html': [
          ['{.tmp,<%= app.dirs.client %>}/{app,components}/**/*.js',
           '!{.tmp,<%= app.dirs.client %>}/app/app.js',
           '!{.tmp,<%= app.dirs.client %>}/{app,components}/**/*.spec.js',
           '!{.tmp,<%= app.dirs.client %>}/{app,components}/**/*.mock.js']
        ]
    }
  },

  // Inject component scss into app.scss
  sass: {
    options: {
      transform: function(filePath) {
        filePath = filePath.replace('/client/app/', '');
        filePath = filePath.replace('/client/components/', '');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector'
    },
    files: {
      '<%= app.dirs.client %>/app/app.scss': [
        '<%= app.dirs.client %>/{app,components}/**/*.{scss,sass}',
        '!<%= app.dirs.client %>/app/app.{scss,sass}'
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
      '<%= app.dirs.client %>/index.html': [
        '<%= app.dirs.client %>/{app,components}/**/*.css'
      ]
    }
  }
};
