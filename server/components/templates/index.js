'use strict';

import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

function readTemplateSync(template) {
  return String(fs.readFileSync(path.join(__dirname, template)));
}

const recapitulatif = Handlebars.compile(readTemplateSync('pdfAnswers.html'));
const synthese = Handlebars.compile(readTemplateSync('pdfSynthese.html'));

export default {
  readTemplateSync,
  recapitulatif,
  synthese
};
