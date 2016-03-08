module.exports = {
  html: ['<%= app.dirs.dist %>/<%= app.dirs.client %>/{,!(bower_components)/**/}*.html'],
  css: ['<%= app.dirs.dist %>/<%= app.dirs.client %>/!(bower_components){,*/}*.css'],
  js: ['<%= app.dirs.dist %>/<%= app.dirs.client %>/!(bower_components){,*/}*.js'],
  options: {
    assetsDirs: [
      '<%= app.dirs.dist %>/<%= app.dirs.client %>',
      '<%= app.dirs.dist %>/<%= app.dirs.client %>/assets/images'
    ],

    // This is so we update image references in our ng-templates
    patterns: {
      js: [
        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
      ]
    }
  }
};
