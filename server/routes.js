/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/mdphs', require('./api/mdph'));
  app.use('/api/requests', require('./api/request'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/certificats', require('./api/certificat'));
  app.use('/api/prestations', require('./api/prestation'));
  app.use('/api/partenaires', require('./api/partenaire'));
  app.use('/api/geva', require('./api/geva'));
  app.use('/api/notification', require('./api/notification'));
  app.use('/api/questions', require('./api/question'));
  app.use('/api/questions-preparation-evaluation', require('./api/questions_preparation_evaluation'));
  app.use('/api/dispatch-rules', require('./api/dispatch-rule'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      var indexPath = path.join(app.get('appPath'), 'index.html');
      res.sendFile(indexPath);
    });
};
