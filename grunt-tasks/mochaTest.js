module.exports = {
  options: {
    reporter: 'spec',
    require: 'mocha.conf.js',
    timeout: 5000 // set default mocha spec timeout
  },
  src: ['server/**/*.spec.js']
};
