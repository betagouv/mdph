'use strict';

var path = require('path');

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    injector: 'grunt-injector',
    sass: 'grunt-sass'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt-tasks
  require('load-grunt-config')(grunt, {
    // path to task.js files, defaults to grunt dir
    configPath: path.join(process.cwd(), 'grunt-tasks'),
    data: {
      pkg: grunt.file.readJSON('package.json'),
      app: {
        port: process.env.PORT || 9000
      }
    },
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function() {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function() {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('serve', function() {
    grunt.task.run([
      'clean:server',
      'env:all',
      'injector:sass',
      'newer:babel:client',
      'sass',
      'injector',
      'postcss',
      'express:dev',
      'wait',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'injector:sass',
    'newer:babel:client',
    'sass',
    'imagemin',
    'injector',
    'useminPrepare',
    'postcss',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'babel:server',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'serve'
  ]);
};
