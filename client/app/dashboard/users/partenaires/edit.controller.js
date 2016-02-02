'use strict';

angular.module('impactApp')
  .controller('PartenairesEditCtrl', function($scope, $state, partenaire, $http) {
    $scope.partenaire = partenaire;

    function envoiNotification(partenaire) {
      var notification = '<h1>Vous n\'avez pas été certifié par votre MDPH</h1><p>Merci de contacter directement votre MDPH si vous souhaitez être certifié.</p>';
      if (partenaire.certified === 'certifie') {
        notification = '<h1>Vous avez été certifié par votre MDPH</h1><p>Vous êtes mainteant un partenaire reconnu de votre MDPH.</p>';
      }

      $http.post('api/send-mail/confirmation', {partenaire: partenaire, html: notification, subject: 'Notification de certification'});
    }

    $scope.update = function() {
      $scope.partenaire.$save(function() {
        envoiNotification(partenaire);
        $state.go('^', {}, {reload: true});
      });
    };

    $scope.delete = function() {
      $scope.partenaire.$delete(function() {
        $state.go('^', {}, {reload: true});
      });
    };
  });
