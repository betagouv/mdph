'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function ($scope, $http, $modal, documents, Partenaire, request) {
  	$scope.documents = documents;
  	$scope.documentTypes = [];
    $scope.request = request;

    $scope.getRequestedDocuments = function(request) {
      if (request && request.steps) {
        var stepsByName = _.indexBy(request.steps, 'name');
        if (stepsByName.complementaire) {
          return stepsByName.complementaire.files;
        }
      }
    };

    $scope.createPartenaire = function (partenaire) {
      var newPartenaire = new Partenaire(partenaire);
      newPartenaire.$save(null, function(data){
      }, function(error){
        //TODO
      });
      envoiConfirmation(partenaire);
    };

    var envoiConfirmation = function(partenaire) {
      $http.post('api/send-mail/confirmation',
        {partenaire: partenaire, html: '<h1>Ajout de documents pour une demande à la MDPH</h1><p>Merci d\'avoir complété cette demande.</p>'}).success(function() {
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
