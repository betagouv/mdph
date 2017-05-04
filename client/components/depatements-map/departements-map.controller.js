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
          const link = mdph.zipcode &&
            `<tr>
            <td class="cell-icon"><i class="fa fa-envelope"></i></td>
            <td><a href="/mdph/${mdph.zipcode}" title="Contacter la mdph">${mdph.name} ${mdph.zipcode}</a></td>
          </tr>`;
          const description = `<table><tbody>${link}</tbody></table>`;
          console.log('description', description);
          const featureLayer = {
            // this feature is in the GeoJSON format: see geojson.org
            // for the full specification
            type: 'Feature',
            geometry: {
              type: 'Point',

              // coordinates here are in longitude, latitude order because
              // x, y is the standard for GeoJSON and many formats
              coordinates: [
                location.coordinates.coordx,
                location.coordinates.coordy
              ]
            },
            properties: {
              title: mdph.name,
              description,
              'marker-size': 'large',
              'marker-color': '#333E54',
              'marker-symbol': 'building'
            }
          };
          L.mapbox.featureLayer(featureLayer, options)
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
