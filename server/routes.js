/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/mdphs', require('./api/mdph'));
  app.use('/api/requests', require('./api/request'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/prestations', require('./api/prestation'));
  app.use('/api/partenaires', require('./api/partenaire'));
  app.use('/api/geva', require('./api/geva'));
  app.use('/api/dispatch-rules', require('./api/dispatch-rule'));
  app.use('/api/sections', require('./api/sections'));
  app.use('/api/secteurs', require('./api/secteur'));
  app.use('/api/stats', require('./api/stats'));
  app.use('/api/document-types', require('./api/document-type'));
  app.use('/api/issues', require('./api/issue'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
