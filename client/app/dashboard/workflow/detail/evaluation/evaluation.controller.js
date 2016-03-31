'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function($scope, $modal, $cookies, sections, model, GevaService, allPrestations, currentRequest, profileSyntheses) {
    $scope.model = model;
    $scope.sections = sections;
    $scope.request = currentRequest;
    $scope.token = $cookies.get('token');
    $scope.profileSyntheses = profileSyntheses;

    $scope.select = function(synthese) {
      $scope.selected = synthese;
    };
  });
