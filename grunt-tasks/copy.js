module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= app.dirs.client %>',
      dest: '<%= app.dirs.dist %>',
      src: [
        '*.{ico,png,txt,pdf}',
        '.htaccess',
        'bower_components/**/*',
        'assets/images/{,*/}*.{webp}',
        'assets/documents/**/*',
        'index.html'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: '<%= app.dirs.dist %>/assets/images',
      src: ['generated/*']
    }]
  },
  styles: {
    expand: true,
    cwd: '<%= app.dirs.client %>',
    dest: '.tmp/',
    src: ['{app,components}/**/*.css']
  }
};
