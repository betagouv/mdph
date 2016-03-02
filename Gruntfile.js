'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    protractor: 'grunt-protractor-runner',
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
        dirs: {
          client: 'client',
          dist: 'dist',
          server: 'server'
        },
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

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('bunyan', function() {
    var path = './node_modules/bunyan/bin/bunyan';
    if (!fs.existsSync(path)) {
      throw new Error('bundle binary not found');
    }

    var child = spawn(path, ['-oshort'], {
      stdio: ['pipe', process.stdout, process.stderr]
    });

    process.stdout.write = function() {
      child.stdin.write.apply(child.stdin, arguments);
    };
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'env:all',
      'injector:sass',
      'concurrent:server',
      'injector',
      'wiredep:client',
      'postcss',
      'express:dev',
      'wait',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', function(target) {
    if (target === 'server') {
      return grunt.task.run([
        'env:all',
        'env:test',
        'mochaTest'
      ]);
    } else if (target === 'client') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'injector:sass',
        'concurrent:test',
        'injector',
        'postcss',
        'wiredep:test',
        'karma'
      ]);
    } else if (target === 'watch') {
      return grunt.task.run([
        'test:server',
        'watch:mochaTest'
      ]);
    } else {
      grunt.task.run([
        'test:server',
        'test:client'
      ]);
    }
  });

  grunt.registerTask('build', [
    'test',
    'jshint',
    'jscs',
    'clean:dist',
    'injector:sass',
    'concurrent:dist',
    'injector',
    'wiredep:client',
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
    'bunyan',
    'serve'
  ]);
};
