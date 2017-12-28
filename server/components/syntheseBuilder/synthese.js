'use strict';

import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import async from 'async';

function readTemplateSync(template) {
  return String(fs.readFileSync(path.join(__dirname, template)));
}

const template = Handlebars.compile(readTemplateSync('./templates/pdfSynthese.html'));

export default function({synthese, host}, next) {
  async.series({

    identites: function(callback) {
      callback(null, {lastname : synthese.lastname, firstname : synthese.firstname, birthdate: synthese.birthdate});
    },

    path: function(callback) {
      callback(null, host);
    }

  },
  function(err, results) {
    if (err) { next(err); }

    var html = template(results);

    next(null, html);
  });
};
