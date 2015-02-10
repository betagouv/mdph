'use strict';

angular.module('impactApp')
  .controller('RequestsCtrl', function ($scope, users) {
    $scope.users = users;

    // $scope.traiterDemande = function (request) {
    //   request.evaluator = $scope.currentUser;
    //   request.$update(function(){
    //     NotificationService.createNotification(request, 'espace_perso.liste_demandes.demande.questionnaire', 'Votre demande est en cours d\'instruction.');
    //   });
    // };
  });
