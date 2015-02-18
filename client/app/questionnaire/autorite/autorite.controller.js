'use strict';

angular.module('impactApp')
  .controller('AutoriteCtrl', function ($scope, $state, datepickerConfig, sectionModel) {
    $scope.sectionModel = sectionModel;

    datepickerConfig.datepickerMode = 'year';
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.submit = function(form) {
      if (form.$invalid) {
        form.showError = true;
      } else {
        $scope.$parent.saveSection($scope.sectionModel);
      }
    };
  });
