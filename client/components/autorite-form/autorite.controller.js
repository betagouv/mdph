'use strict';

angular.module('impactApp')
  .controller('AutoriteCtrl', function($state, $scope, AdressService, $window) {
      $scope.identite = this.identite;
      $scope.id = this.id;
      $scope.required = this.required;

      $scope.forms = $state.current.data.forms;

      $window.navigator.geolocation.getCurrentPosition(function(position) {
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
      });

      $scope.getAdress = AdressService.getAdress;

      $scope.hasError = function(name) {
        return $scope.required ? $scope.forms.infoForm['' + name + this.id].$invalid : false;
      };

      $scope.getError = function(name) {
        return $scope.forms.infoForm['' + name + this.id].$error;
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
