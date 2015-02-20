'use strict';

angular.module('impactApp')
  .controller('IdentiteCtrl', function ($scope, $state, sectionModel, saveSection) {
    $scope.sectionModel = sectionModel;

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.submit = function(form) {
      if (form.$invalid) {
        form.showError = true;
      } else {
        saveSection();
      }
    };
  });
