'use strict';

angular.module('impactApp')
  .controller('RepresentantCtrl', function($state, $scope, AdressService) {
      $scope.representant = this.representant;
      $scope.id = this.id;
      $scope.required = this.required;
      $scope.currentMdph = this.currentMdph;
      $scope.getAdress = AdressService.getAdress;
      $scope.fillAdressOnSelect = AdressService.fillAdressOnSelect;

      $scope.forms = $state.current.data.forms;

      $scope.hasError = function(name) {
        return $scope.forms.representantForm['' + name + this.id].$invalid;
      };

      $scope.getError = function(name) {
        return $scope.forms.representantForm['' + name + this.id].$error;
      };

      $scope.changeIsSameAddress = function() {
        if ($scope.representant.isSameAddress) {
          $scope.searchAdress = '';
          $scope.representant.complementAdresse = '';
          $scope.representant.nomVoie = '';
          $scope.representant.code_postal = '';
          $scope.representant.localite = '';
          $scope.representant.pays = '';
        }
      };
    });
