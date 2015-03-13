module.exports = {
  html: ['<%= app.dirs.dist %>/{,*/}*.html'],
  css: ['<%= app.dirs.dist %>/{,*/}*.css'],
  js: ['<%= app.dirs.dist %>/{,*/}*.js'],
  options: {
    assetsDirs: [
      '<%= app.dirs.dist %>',
      '<%= app.dirs.dist %>/assets/images'
    ],
    // This is so we update image references in our ng-templates
    patterns: {
      js: [
        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
      ]
    }
  }
};
