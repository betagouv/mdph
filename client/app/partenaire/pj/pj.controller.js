'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function ($scope, $http, $modal, $upload, $state, Partenaire, documentTypes, request, mdph, type) {
    $scope.request = request;
    if (type) {
      $scope.documentTypes = _.filter(documentTypes, {id: type});
      $scope.selectedType = documentTypes[0];
    } else {
      $scope.documentTypes = _.filter(documentTypes, function(documentType) {
        return documentType.id !== 'certificatMedical';
      });
    }
    $scope.mdph = mdph;

    $scope.envoiConfirmation = function(form) {
      if (form.$valid) {
        $upload.upload({
          url: 'api/requests/' + $scope.request.shortId + '/document?partenaire=true',
          method: 'POST',
          file: $scope.files[0],
          data: {
            partenaire: $scope.partenaire._id,
            type: $scope.selectedType.id,
            email: {
              html: '<h1>Ajout de documents pour une demande à la MDPH</h1><p>Merci d\'avoir complété cette demande.</p>',
              subject: 'Ajout de documents - confirmation'
            }
          }
        }).success(function() {
          $modal.open({
            templateUrl: 'app/partenaire/pj/confirmationModal.html',
            controller: function($scope, $modalInstance) {
              $scope.ok = function() {
                $modalInstance.close();
                $state.go('^');
              };
            }
          });
        });
      }
    };
  });
