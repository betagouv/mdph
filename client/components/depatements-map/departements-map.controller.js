'use strict';

angular.module('impactApp')
  .controller('DepsMapCtrl', function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiaW1wYWN0LW1hcGJveCIsImEiOiJjaWt6bmpqYTUwMDcwd29tNDRpczM2N2pwIn0.Qh9eYg3TMD00z22WzmDXyQ';

    // Center map to France center.
    const map = L.mapbox.map('map', 'mapbox.streets').setView([46.52863469527167,2.43896484375], 6);

    // Load departments borders map.
    L.geoJson(this.depsgeo, { style: L.mapbox.simplestyle.style }).addTo(map);

    this.mdphs.map(mdph => {
      const options = {
        title: mdph.name,
        alt: '/mdph/' + mdph.zipcode
      };

      mdph.locations.map(location => {
        // Only pin headquarters.
        if (location.headquarters) {
          L.marker([location.coordinates.coordy, location.coordinates.coordx], options)
            .on('click', () => window.location = '/mdph/' + mdph.zipcode)
            .addTo(map);
        }
      });
    });

    // Disable drag and zoom handlers.
    map.scrollWheelZoom.disable();

    // Disable tap handler, if present.
    if (map.tap) {
      map.tap.disable();
    }
  });
