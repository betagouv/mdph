'use strict';

angular.module('impactApp')
  .controller('DepartementCtrl', function($scope, $rootScope, $state, $timeout, currentUser, currentMdph) {
    $scope.$emit('event:mdph-changed', currentMdph);
    $scope.currentUser = currentUser;

    L.mapbox.accessToken = 'pk.eyJ1IjoicnF1ZWxlbiIsImEiOiJjaWtwaG15YjYwMGJ1dzVtNnE3dTZxc3VsIn0.QnrYAVJmcu9JS523vwLR6A';

    $scope.isAdmin = function() {
      if (!currentUser) {
        return false;
      }

      switch (currentUser.role) {
        case 'admin':
          return true;
        case 'adminMdph':
          return currentUser.mdph.zipcode === currentMdph.zipcode;
        default:
          return false;
      }
    };

    $timeout(function() {
      var mapBoxOptions = {paddingTopLeft: [200, 0]};
      var map = L.mapbox.map('map', 'mapbox.streets').setView([currentMdph.coordinates.coordy, currentMdph.coordinates.coordx], 14);

      // Disable drag and zoom handlers.
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.keyboard.disable();

      // Disable tap handler, if present.
      if (map.tap) {
        map.tap.disable();
      }

      L.mapbox.featureLayer({
        // this feature is in the GeoJSON format: see geojson.org
        // for the full specification
        type: 'Feature',
        geometry: {
          type: 'Point',

          // coordinates here are in longitude, latitude order because
          // x, y is the standard for GeoJSON and many formats
          coordinates: [
            currentMdph.coordinates.coordx,
            currentMdph.coordinates.coordy
          ]
        },
        properties: {
          title: currentMdph.name,
          description: currentMdph.address,
          'marker-size': 'large',
          'marker-color': '#333E54',
          'marker-symbol': 'building'
        }
      }).addTo(map);

    });

  });
