'use strict';

angular.module('impactApp')
  .controller('RequestNonAttribueCtrl', function ($scope, requests, NotificationService, $state) {
    $scope.requests = requests;
    $scope.onlyUrgences = false;

    $scope.assigner = function(requests) {
      requests.forEach(function(request) {
        if (request.isSelected) {
          request.evaluator = $scope.currentUser;
          request.$update(function() {
            NotificationService.createNotification(request, 'espace_perso.liste_demandes.demande.questionnaire', 'Votre demande est en cours d\'instruction.');
          });
        }
      });
      $scope.$emit('assign-request');
      $state.go('dashboard.requests.list.user', {userId: $scope.currentUser._id});
    };

    $scope.filtreUrgences = function(value) {
      if ($scope.onlyUrgences) {
        return angular.isDefined(value.formAnswers);
      }
      return true;
    };
  });
