'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function ($scope, $http, $modal, $upload, Partenaire, request, NotificationService) {
    $scope.request = request;
    $scope.currentFormStep = _.find($scope.request.steps, {'name': 'complementaire'});
    $scope.files = $scope.currentFormStep.files;
    $scope.partenaire = {};

    $scope.onFileSelect = function($files, currentFile) {
      currentFile.upload = $files[0];
      currentFile.path = currentFile.upload.name;
    };

    $scope.checkIfDisabled = function() {
      return !$scope.partenaire.email || !_.some($scope.files, 'path');
    };

    $scope.envoiConfirmation = function(partenaire) {
      var confirmationSent = false;
      _.forEach($scope.files, function(file) {
        if (file.upload) {
          if (confirmationSent === false) {
            confirmationSent = true;
            $http.post('api/send-mail/confirmation', {
              partenaire: partenaire,
              html: '<h1>Ajout de documents pour une demande à la MDPH</h1><p>Merci d\'avoir complété cette demande.</p>',
              subject: 'Ajout de documents - confirmation'
            }).success(function() {
              $modal.open({
                templateUrl: 'app/partenaire/pj/confirmationModal.html',
                controller: function($scope, $modalInstance) {
                  $scope.ok = function() {
                    $modalInstance.close();
                  };
                }
              });
            });
          }
          $upload.upload({
            url: 'api/requests/' + $scope.request.shortId + '/document',
            withCredentials: true,
            data: {
              step: 'complementaire',
              partenaire: partenaire.email,
              name: file.name
            },
            file: file.upload
          }).success(function(){
            NotificationService.createNotificationAdmin($scope.request, 'dashboard.repartition_demandes.detail', 'Ajout par partenaire');
            NotificationService.createNotification($scope.request, 'liste_demandes.demande.complementaire', 'Ajout par partenaire');
          });
        }
      });
    };
  });
