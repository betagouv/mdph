'use strict';

export default function() {
  let app = require('../app').app;
  let gridfs = app.get('gridfs');

  return gridfs;
}
