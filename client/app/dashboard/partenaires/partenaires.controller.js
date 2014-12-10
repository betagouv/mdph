'use strict';

angular.module('impactApp')
  .controller('PartenairesCtrl', function ($scope, Partenaire, $http) {
    $scope.partenaires = Partenaire.query();

    $scope.certifier = function(partenaire) {
      partenaire.certified = 'Certifié';
      Partenaire.$update({id: partenaire._id}, partenaire);
      envoiNotification(partenaire);
    };

    $scope.refuser = function(partenaire) {
      partenaire.certified = 'Refusé';
      Partenaire.$update({id: partenaire._id}, partenaire);
      envoiNotification(partenaire);
    };

    var envoiNotification = function(partenaire) {
      var notification = '<h1>Vous n\'avez pas été certifié par votre MDPH</h1><p>Merci de contacter directement votre MDPH si vous souhaitez être certifié.</p>';
      if (partenaire.certified === 'Certifié'){
        notification = '<h1>Vous avez été certifié par votre MDPH</h1><p>Vous êtes mainteant un partenaire reconnu de votre MDPH.</p>';
      }
      $http.post('api/send-mail/confirmation',
        {partenaire: partenaire, html: notification, subject: 'Notification de certification'}).success(function() {

      });

    };

  });
