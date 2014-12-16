'use strict';

angular.module('impactApp')
  .controller('RequestsCtrl', function ($scope, $http, $state, RequestStepService, RequestService, requestSteps, requests, Auth) {

    $scope.requests = _.sortBy(requests, $scope.updatedAt);
    $scope.demandeTraitee = [];
    $scope.currentUser = Auth.getCurrentUser();
    $scope.updatedAt = RequestService.updatedAt;

    $scope.delete = function(request) {
      $http.delete('/api/requests/' + request.shortId).success(function() {
        angular.forEach($scope.requests, function(f, i) {
          if (f._id === request.shortId) {
            $scope.requests.splice(i, 1);
            $state.go('dashboard.requests');
          }
        });
      });
    };

    $scope.selectedFilters = {

    };

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

    $scope.traiterDemande = function (request, $index) {
      request.evaluator = $scope.currentUser;
      request.$update({id: request.shortId});
      $scope.demandeTraitee[$index] = true;
    };

  });
