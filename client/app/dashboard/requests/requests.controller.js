'use strict';

angular.module('impactApp')
  .controller('RequestsCtrl', function ($scope, $http, $state, RequestStepService, RequestService, requestSteps, requests, Auth) {

    $scope.requests = _.sortBy(requests, $scope.updatedAt);
    $scope.currentUser = Auth.getCurrentUser();
    $scope.updatedAt = RequestService.updatedAt;

    $scope.selectedFilters = {};
    $scope.availableFilters = requestSteps;

    $scope.filtres = function(request){
      return filtreNom(request) && filtreEtat(request);
    };

    var filtreNom = function(request){
      if (!$scope.query){
        return true;
      }
      return request.user.name.indexOf($scope.query) >= 0;
    };

    var filtreEtat = function(request){
      var formSteps = RequestStepService.getFormSteps(request);
      var obj = _.indexBy(formSteps, 'id');

      for (var i = $scope.availableFilters.length - 1; i >= 0; i--) {
        var availableFilter = $scope.availableFilters[i];
         if ($scope.selectedFilters[availableFilter.id]) {
          if(!obj[availableFilter.id] || obj[availableFilter.id].isFinished !== true){
            return false;
          }
        }
      }

      return true;
    };

    $scope.traiterDemande = function (request) {
      request.evaluator = $scope.currentUser;
      request.$update();
    };

  });
