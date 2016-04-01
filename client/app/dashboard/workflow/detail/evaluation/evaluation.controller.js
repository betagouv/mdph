'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function($scope, $modal, $cookies, sections, model, GevaService, currentRequest, listProfileSyntheses) {
    $scope.model = model;
    $scope.sections = sections;
    $scope.request = currentRequest;
    $scope.token = $cookies.get('token');
    $scope.profileSyntheses = listProfileSyntheses;

    // let currentRequestSynthese

    $scope.select = function(synthese) {
      $scope.selected = synthese;
    };
  });
