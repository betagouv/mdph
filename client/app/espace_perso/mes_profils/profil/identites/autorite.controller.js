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

      $scope.changeIsSameAddress = function() {
        if ($scope.identite.isSameAddress) {
          $scope.searchAdress = '';
          $scope.identite.nomVoie = '';
          $scope.identite.code_postal = '';
          $scope.identite.localite = '';
        }
      };
    });
