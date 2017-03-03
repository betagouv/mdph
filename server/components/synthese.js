'use strict';

import async from 'async';
import {synthese} from './templates';

exports.answersToHtml = function(request, path, output, next) {
  async.series({
    proposition: function(callback) {
      callback(null, request.synthese.proposition);
    },

    identites: function(callback) {
      callback(null, request.formAnswers.identites);
    },

    mdph: function(callback) {
      callback(null, request.mdph);
    },

    path: function(callback) {
      callback(null, path);
    }
  },
  function(err, results) {
    if (err) { next(err); }

    var html = synthese(results);

    next(null, html);
  });
};
