'use strict';

var fs = require('fs');
var _ = require('lodash');
var spawn = require('child_process').spawn;

function loadConfig(path) {
  var config = {};
  fs.readdirSync(path).forEach(function(file) {
    var taskName = file.replace(/\.js$/, '');
    config[taskName] = require(path + file);
  });

  return config;
}

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

  var config = {
    // Common settings
    pkg: grunt.file.readJSON('package.json'),
    app: {
      dirs: {
        client: 'client',
        dist: 'dist'
      },
      port: process.env.PORT || 9000
    }
  };

  // Load grunt-tasks
  _.extend(
    config,
    loadConfig(__dirname + '/grunt-tasks/')
  );

  grunt.initConfig(config);

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
      'wiredep',
      'autoprefixer',
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
        'autoprefixer',
        'karma'
      ]);
    } else if (target === 'e2e') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'env:test',
        'injector:sass',
        'concurrent:test',
        'injector',
        'wiredep',
        'autoprefixer',
        'express:dev',
        'protractor'
      ]);
    } else {
      grunt.task.run([
        'test:server',
        'test:client'
      ]);
    }
  });

  grunt.registerTask('build', [
    'jshint',
    'jscs',
    'clean:dist',
    'injector:sass',
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
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
