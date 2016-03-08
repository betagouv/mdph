module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= app.dirs.client %>',
      dest: '<%= app.dirs.dist %>/<%= app.dirs.client %>',
      src: [
        '*.{ico,png,txt}',
        '.htaccess',
        'bower_components/**/*',
        'assets/images/{,*/}*.{webp}',
        'assets/fonts/**/*',
        'index.html'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: '<%= app.dirs.dist %>/<%= app.dirs.client %>/assets/images',
      src: ['generated/*']
    }, {
      expand: true,
      dest: '<%= app.dirs.dist %>',
      src: [
        'package.json',
        '<%= app.dirs.server %>/**/*',
        '!<%= app.dirs.server %>/config/local.env.sample.js'
      ]
    }]
  },
  styles: {
    expand: true,
    cwd: '<%= app.dirs.client %>',
    dest: '.tmp/',
    src: ['{app,components}/**/*.css']
  }
};
