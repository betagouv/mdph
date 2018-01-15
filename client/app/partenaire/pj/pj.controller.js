'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function($scope, $modal, Upload, $state, documentTypes, request, partenaire, currentMdph, FileSignatureService, toastr) {
    $scope.request = request;
    $scope.partenaire = partenaire;
    $scope.documentTypes = documentTypes;
    $scope.selectedType = documentTypes[0];

    $scope.envoiConfirmation = function(form) {
      if (form.$valid) {
        FileSignatureService.check($scope.files[0], ['pdf', 'jpg', 'png'])
        .then(function(result) {
          if (result) {
            Upload.upload({
              url: 'api/requests/' + $scope.request.shortId + '/document/partenaire',
              method: 'POST',
              data: {
                file: $scope.files[0],
                partenaire: partenaire._id,
                type: $scope.selectedType.id
              }
            }).then(function() {
              $modal.open({
                templateUrl: 'app/partenaire/pj/confirmationModal.html',
                controller: function($scope, $modalInstance, type) {
                  $scope.type = type;
                  $scope.ok = function() {
                    $modalInstance.close();
                    $state.go('partenaire.pj', {}, {reload:true});
                  };
                },

                resolve: {
                  type: function() {
                    return $scope.selectedType.id;
                  }
                }
              });
            });
          } else {
            toastr.error('Types de documents acceptés : images (jpg, png) et pdf', 'Erreur lors du chargement du document');
          }
        });
      }
    };
  });
