'use strict';

import filterMissing from './filter-missing';
import path from 'path';

const existingFile = path.join(__dirname, 'pdf-sample.pdf');
const missingFile = path.join(__dirname, 'missing-file.pdf');
const error = path.join(__dirname, 'error.pdf');

describe('FilterMissing', () => {
  it('should replace missing documents with the error pdf', () => {
    const fileList = [{path: existingFile}, {path: missingFile}];

    return filterMissing(fileList).then((filteredList) => {
      filteredList.should.not.containEql({path: missingFile});
      filteredList.should.containEql({path: error});
    });
  });
});
