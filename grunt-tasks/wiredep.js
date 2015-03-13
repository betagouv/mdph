module.exports = {
  target: {
    src: '<%= app.dirs.client %>/index.html',
    ignorePath: '<%= app.dirs.client %>/',
    exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/ ]
  }
};
