'use strict';

angular.module('impactApp')
  .controller('AutoriteCtrl', function($state, $scope, AdressService) {
      $scope.identite = this.identite;
      $scope.id = this.id;
      $scope.required = this.required;
      $scope.currentMdph = this.currentMdph;
      $scope.getAdress = AdressService.getAdress;
      $scope.fillAdressOnSelect = AdressService.fillAdressOnSelect;

      $scope.forms = $state.current.data.forms;

      $scope.hasError = function(name) {
        return $scope.required ? $scope.forms.infoForm['' + name + this.id].$invalid : false;
      };

      $scope.getError = function(name) {
        return $scope.forms.infoForm['' + name + this.id].$error;
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
