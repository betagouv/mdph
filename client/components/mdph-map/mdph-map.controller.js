'use strict';

angular.module('impactApp')
  .controller('MdphMapCtrl', function() {
    this.locations = this.mdph && this.mdph.locations;

    L.mapbox.accessToken = 'pk.eyJ1IjoiaW1wYWN0LW1hcGJveCIsImEiOiJjaWt6bmpqYTUwMDcwd29tNDRpczM2N2pwIn0.Qh9eYg3TMD00z22WzmDXyQ';

    (() => {
      if (!this.locations || this.locations.length === 0) {
        return;
      }

      const map = L.mapbox.map('map', 'mapbox.streets');

      if (this.locations.length === 1) {
        map.setView([this.locations[0].coordinates.coordy, this.locations[0].coordinates.coordx], 14);
      } else {
        const bounds = this.locations.map(location => [location.coordinates.coordy, location.coordinates.coordx]);
        map.fitBounds(bounds, { padding: [20, 30] });
      }

      // Disable drag and zoom handlers.
      map.scrollWheelZoom.disable();

      // Disable tap handler, if present.
      if (map.tap) {
        map.tap.disable();
      }

      L.Map = L.Map.extend({
        openPopup: function(popup) {
          this._popup = popup;
          return this.addLayer(popup).fire('popupopen', {
            popup: this._popup
          });
        }
      });

      this.locations.forEach(location => {
        const addressRow = location.address &&
          `<tr>
            <td class="cell-icon"><i class="fa fa-home"></i></td>
            <td><span>${location.address}</span></td>
          </tr>`;

        const phoneRow = location.phone &&
          `<tr>
            <td class="cell-icon"><i class="fa fa-phone"></i></td>
            <td><span>${location.phone}</span></td>
          </tr>`;

        const emailRow = location.email &&
          `<tr>
            <td class="cell-icon"><i class="fa fa-envelope"></i></td>
            <td><a href="mailto:${location.email}" title="Envoyer un mail de contact">${location.email}</a></td>
          </tr>`;

        const scheduleRow = location.schedule &&
          `<tr>
            <td class="cell-icon"><i class="fa fa-clock-o"></i></td>
            <td><span>${location.schedule}</span></td>
          </tr>`;

        const description = `<table><tbody>${addressRow}${phoneRow}${emailRow}${scheduleRow}</tbody></table>`;

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
            title: location.name,
            description,
            'marker-size': 'large',
            'marker-color': location.headquarters ? '#333E54' : '#FFFFFF',
            'marker-symbol': 'building'
          }
        };

        const options = {
          popupOptions: {
            minWidth: 350,
          },
        };

        const popup = L.mapbox.featureLayer(featureLayer, options).addTo(map);

        if (location.headquarters) {
          popup.openPopup();
        }
      });
    })();
  });
