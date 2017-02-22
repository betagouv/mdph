module.exports = {
  html: ['dist/client/!(lib){,*/}*.html'],
  css: ['dist/client/!(lib){,*/}*.css'],
  js: ['dist/client/!(lib){,*/}*.js'],
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
