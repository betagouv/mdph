module.exports = {
  html: ['dist/client/!(bower_components){,*/}*.html'],
  css: ['dist/client/!(bower_components){,*/}*.css'],
  js: ['dist/client/!(bower_components){,*/}*.js'],
  options: {
    assetsDirs: [
      'dist/client',
      'dist/client/assets/images'
    ],

    // This is so we update image references in our ng-templates
    patterns: {
      js: [
        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
      ]
    }
  }
};
