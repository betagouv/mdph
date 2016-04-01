'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function($scope, $modal, $cookies, $state, $stateParams, sections, model, GevaService, currentRequest, listProfileSyntheses) {
    $scope.model = model;
    $scope.sections = sections;
    $scope.request = currentRequest;
    $scope.token = $cookies.get('token');
    $scope.profileSyntheses = listProfileSyntheses;

    if (!$stateParams.syntheseId) {
      let currentRequestSynthese = _.find(listProfileSyntheses, {selected: true});
      $state.go($state.current, {syntheseId: currentRequestSynthese._id});
    }
  });
