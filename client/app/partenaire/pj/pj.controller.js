'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function ($scope, $http, $modal, Partenaire, request) {
    $scope.request = request;

    $scope.createPartenaire = function (partenaire) {
      var newPartenaire = new Partenaire(partenaire);
      newPartenaire.$save(null, function(){
      }, function(){
        //TODO
      });
      envoiConfirmation(partenaire);
    };

    var envoiConfirmation = function(partenaire) {
      $http.post('api/send-mail/confirmation',
        {partenaire: partenaire, html: '<h1>Ajout de documents pour une demande à la MDPH</h1><p>Merci d\'avoir complété cette demande.</p>', subject: 'Ajout de documents - confirmation'}).success(function() {
        $modal.open({
          templateUrl: 'app/partenaire/pj/confirmationModal.html',
          controller: function($scope, $modalInstance) {
            $scope.ok = function() {
              $modalInstance.close();
            };
          }
        });
      });
    };
  });
