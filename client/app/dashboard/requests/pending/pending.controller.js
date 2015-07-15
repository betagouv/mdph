'use strict';

angular.module('impactApp')
  .controller('PendingRequestsCtrl', function ($scope, $http, requests, currentUser, NotificationService, $state) {
    $scope.requests = requests;
    $scope.onlyUrgences = false;

    $scope.selectAll = function() {
      var action;
      if ($scope.allSelected()) {
        action = false;
      } else {
        action = true;
      }
      $scope.requests.forEach(function(request) {
        request.isSelected = action;
      });
    };

    $scope.allSelected = function() {
      var test = $scope.requests.length > 0;
      $scope.requests.forEach(function(request) {
        if (!request.isSelected) {
          test = false;
        }
      });
      return test;
    };

    $scope.assigner = function(requests) {
      requests.forEach(function(request) {
        if (request.isSelected) {
          request.evaluator = currentUser._id;
          return $http.put('/api/requests/' + request.shortId, request).then(function(result) {
            NotificationService.createNotification(request, 'espace_perso.liste_demandes.demande.questionnaire', 'Votre demande est en cours d\'instruction.');
          });
          $scope.$emit('assign-request');
        }
      });
      $state.go('dashboard.requests.user', {userId: $scope.currentUser._id});
    };
  });
