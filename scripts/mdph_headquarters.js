'use strict';

import _ from 'lodash';
import Mdph from '../server/api/mdph/mdph.model';

(function() {
  Mdph
    .find()
    .exec(function(err, mdphs) {
      const promises = mdphs.map(mdph => {
        return new Promise((resolve) => {
          const mdphObject = mdph.toObject();
          const headquartersIndex = _.findIndex(mdphObject.locations, {'headquarters': true});

          const headquarters = mdphObject.locations[headquartersIndex];

          mdphObject.locations.splice(headquartersIndex, 1);
          const subsidiairies = mdphObject.locations;

          mdph.set('headquarters', headquarters);
          mdph.set('subsidiairies', subsidiairies);

          mdph.locations = undefined;

          return mdph.save(function(err, saved) {
            resolve();
          });
        })
      });

      Promise.all(promises).then(() => {
        process.exit(0)
      });
    });
})();
