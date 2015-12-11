'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function($scope, $http, $modal, Upload, $state, Partenaire, documentTypes, request, mdph, partenaire) {
    $scope.request = request;
    $scope.partenaire = partenaire;
    $scope.mdph = mdph;
    $scope.documentTypes = documentTypes;
    $scope.selectedType = documentTypes[0];

    $scope.envoiConfirmation = function(form) {
      if (form.$valid) {
        Upload.upload({
          url: 'api/requests/' + $scope.request.shortId + '/document-partenaire',
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
