'use strict';

angular.module('impactApp')
  .controller('AutoriteCtrl', function($scope, identite, AdressService, $window, label) {
      $scope.identite = identite;
      $scope.label = label;

      $window.navigator.geolocation.getCurrentPosition(function(position) {
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
      });

      $scope.getAdress = AdressService.getAdress;

      $scope.fillAdressOnSelect = function(result) {
        $scope.identite.nomVoie = result.properties.name;
        $scope.identite.code_postal = result.properties.postcode;
        $scope.identite.localite = result.properties.city;
      };

      $scope.disableAddress = function() {
        return ($scope.identite && $scope.identite.adresseInconnue ? true : false);
      };
    });
