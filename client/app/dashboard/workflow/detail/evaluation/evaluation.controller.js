'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function($scope, $modal, $cookies, $state, $stateParams, sections, model, GevaService, currentRequest, listSyntheses) {
    $scope.model = model;
    $scope.sections = sections;
    $scope.request = currentRequest;
    $scope.token = $cookies.get('token');
    $scope.listSyntheses = listSyntheses;

    if (!$stateParams.syntheseId) {
      let currentSynthese = _.find(listSyntheses, {current: true});
      $state.go($state.current, {syntheseId: currentSynthese._id});
    } else {
      $scope.currentSynthese = _.find(listSyntheses, {_id: $stateParams.syntheseId});
    }
  });
