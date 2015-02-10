'use strict';

angular.module('impactApp')
  .controller('RequestListCtrl', function ($scope, user, requests, currentUser, NotificationService, $state) {
    $scope.requests = requests;
    $scope.user = user;
    $scope.currentUser = currentUser;
    $scope.onlyUrgences = false;

    $scope.assigner = function(requests) {
      _.forEach(requests, function(request) {
        if (request.isSelected) {
          request.evaluator = $scope.currentUser;
          request.$update(function() {
            NotificationService.createNotification(request, 'espace_perso.liste_demandes.demande.questionnaire', 'Votre demande est en cours d\'instruction.');
          });
        }
      });

      $state.go('dashboard.requests.list', {userId: currentUser._id});
    };

    $scope.filtreUrgences = function(value) {
      if ($scope.onlyUrgences) {
        return angular.isDefined(value.formAnswers);
      }
      return true;
    };
  });
