/*jslint bitwise: true */

'use strict';

import fs from 'fs';
import tmp from 'tmp';
import archiver from 'archiver';

export default function(fileList, directory) {
  return new Promise((resolve, reject) => {
    tmp.file({dir: directory, keep: true}, (err, tempFilePath, fileDescriptor, cleanupCallback) => {
      if (err) {
        return reject(err);
      }

      var archive = archiver.create('zip', {});

      fileList.forEach((file) => {
        var filename = file.name.replace(" / ", "_").replace("/", "_");
        archive.append(fs.createReadStream(file.path), { name: filename });
      });

      archive.on('finish', function() {
        cleanupCallback();
      });

      archive.on('error', function(err) {
        return reject(err);
      });

      archive.finalize();

      return resolve(archive);
    });
  });
}
