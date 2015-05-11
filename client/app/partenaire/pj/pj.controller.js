'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function ($scope, $http, $modal, $upload, $state, Partenaire, documentTypes, request, mdph, type, partenaire) {
    $scope.request = request;
    $scope.partenaire = partenaire;

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
            partenaire: partenaire._id,
            type: $scope.selectedType.id
          }
        }).success(function() {
          $modal.open({
            templateUrl: 'app/partenaire/pj/confirmationModal.html',
            controller: function($scope, $modalInstance, type) {
              $scope.type = type;
              $scope.ok = function() {
                $modalInstance.close();
                $state.go('main');
              };
            },
            resolve: {
              type: function() {
                return $scope.selectedType.id;
              }
            }
          });
        });
      }
    };
  });
