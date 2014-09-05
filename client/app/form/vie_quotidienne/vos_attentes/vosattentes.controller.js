'use strict';

angular.module('impactApp')
  .controller('VosAttentesVieCtrl', function ($scope) {

    if (angular.isUndefined($scope.sectionModel.attentes)) {
      $scope.sectionModel.attentes = {
        label: 'Vos attentes pour compenser votre handicap',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.attentes.answers;
  });
