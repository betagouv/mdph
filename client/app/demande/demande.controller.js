'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function($scope, $state, $window, $modal, mdph, documentTypes, sections, Auth, request, RequestService) {
    $scope.request = request;
    $scope.mdph = mdph;
    $scope.formAnswers = request.formAnswers;
    $scope.getCompletion = RequestService.getCompletion;

    $scope.estAdulte = function() {
      return RequestService.estAdulte(request);
    };
  });
