module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: 'client',
      dest: 'dist/client',
      src: [
        '*.{ico,png,txt}',
        '.htaccess',
        'lib/**/*',
        'assets/documents/**/*',
        'assets/images/{,*/}*.{webp}',
        'assets/fonts/**/*',
        'index.html'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: 'dist/client/assets/images',
      src: ['generated/*']
    }, {
      expand: true,
      dest: 'dist',
      src: [
        'node_modules/**/*',
        'server/**/*',
        '!server/config/local.env.sample.js'
      ]
    }]
  },
  styles: {
    expand: true,
    cwd: 'client',
    dest: '.tmp/',
    src: ['{app,components}/**/*.css']
  }
};
