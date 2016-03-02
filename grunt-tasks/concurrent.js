module.exports = {
  server: [
    'newer:babel:client',
    'sass',
  ],
  test: [
    'newer:babel:client',
    'sass',
  ],
  dist: [
    'newer:babel:client',
    'sass',
    'imagemin'
  ]
};
