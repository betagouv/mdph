'use strict';

angular.module('impactApp')
  .controller('RepartitionDemandesCtrl', function ($scope, users, requests, RequestResource, Auth) {
    $scope.users = users;
    $scope.requests = _.sortBy(requests, $scope.updatedAt);
    $scope.demandeTraitee = [];

    $scope.traiterDemande = function (request, $index) {
      request.evaluator = Auth.getCurrentUser();
      request.$update({id: request.shortId});
      $scope.demandeTraitee[$index] = true;
    };
  });
