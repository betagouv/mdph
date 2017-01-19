module.exports = {
  options: {
    exclude: [
      /bootstrap.js/,
      '/json3/',
      '/es5-shim/',
      /font-awesome\.css/,
      /bootstrap\.css/,
      /bootstrap-sass-official/
    ]
  },
  client: {
    src: 'client/index.html',
    ignorePath: 'client/',
  },
  test: {
    src: './karma.conf.js',
    devDependencies: true
  }
};
