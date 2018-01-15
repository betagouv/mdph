'use strict';

import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

export function readTemplateSync(template) {
  return String(fs.readFileSync(path.join(__dirname, template)));
}

export const cerfa = Handlebars.compile(readTemplateSync('pdfCerfa.html'));
export const synthese = Handlebars.compile(readTemplateSync('pdfSynthese.html'));
