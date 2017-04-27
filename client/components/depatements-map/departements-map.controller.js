'use strict';

angular.module('impactApp')
  .controller('DepsMapCtrl', function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiaW1wYWN0LW1hcGJveCIsImEiOiJjaWt6bmpqYTUwMDcwd29tNDRpczM2N2pwIn0.Qh9eYg3TMD00z22WzmDXyQ';

    const map = L.mapbox.map('map', 'mapbox.streets').setView([46.52863469527167,2.43896484375], 6);

    L.geoJson(this.depsgeo, { style: L.mapbox.simplestyle.style }).addTo(map);

    // Disable drag and zoom handlers.
    map.scrollWheelZoom.disable();

    // Disable tap handler, if present.
    if (map.tap) {
      map.tap.disable();
    }

  });
