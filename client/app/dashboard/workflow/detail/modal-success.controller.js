'use strict';

angular.module('impactApp')
  .controller('ModalSuccessCtrl', function($scope, $modalInstance, documentTypes, request) {
    $scope.request = request;
    $scope.demandeTypesComplementaires = [];
    $scope.documentTypes = documentTypes;

    $scope.save = function() {
      // TODO
    };

    function alreadySelected(type) {
      return _.find($scope.demandeTypesComplementaires, function(current) {
        return current.id === type.id;
      });
    }

    $scope.addSelectedType = function(type) {
      if (!alreadySelected(type)) {
        $scope.demandeTypesComplementaires.push(type);
      }

      $scope.selected = null;
    };

    $scope.removeSelectedType = function(idx) {
      $scope.demandeTypesComplementaires.splice(idx, 1);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
