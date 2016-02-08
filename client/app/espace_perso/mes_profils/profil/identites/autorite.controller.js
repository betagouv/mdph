'use strict';

angular.module('impactApp')
  .controller('AutoriteCtrl', function($state, $scope, identite, AdressService, $window, id) {
      $scope.identite = identite;
      $scope.id = id;

      $scope.forms = $state.current.data.forms;

      $window.navigator.geolocation.getCurrentPosition(function(position) {
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
      });

      $scope.getAdress = AdressService.getAdress;

      $scope.hasError = function(name) {
        return $scope.forms.infoForm['' + name + id].$invalid;
      };

      $scope.getError = function(name) {
        return $scope.forms.infoForm['' + name + id].$error;
      };

      $scope.fillAdressOnSelect = function(result) {
        $scope.identite.nomVoie = result.properties.name;
        $scope.identite.code_postal = result.properties.postcode;
        $scope.identite.localite = result.properties.city;
      };

      $scope.disableAddress = function() {
        return ($scope.identite && $scope.identite.adresseInconnue ? true : false);
      };
    });
