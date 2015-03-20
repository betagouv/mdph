'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function ($scope, $http, $modal, $upload, Partenaire, documentTypes, request, mdph) {
    $scope.request = request;
    $scope.documentTypes = documentTypes;
    $scope.mdph = mdph;

    $scope.envoiConfirmation = function(form) {
      if (form.$valid) {
        debugger;
        $upload.upload({
            url: 'api/requests/' + $scope.request.shortId + '/document/' + $scope.selectedType + '?partenaire=true',
            file: $scope.files[0],
            data: {
              partenaire: $scope.partenaire,
              html: '<h1>Ajout de documents pour une demande à la MDPH</h1><p>Merci d\'avoir complété cette demande.</p>',
              subject: 'Ajout de documents - confirmation'
            }
        });
        // TODO: Afficher progression
        // .progress(function (evt) {
        //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //     console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        // })
        // .success(function (data) {
        //   document.files.push(data._id);
        // });

        // $http.post('api/requests/' + $scope.request.shortId + '/document/' + $scope.selectedType, {
        //   partenaire: $scope.partenaire,

        // }).success(function() {
        //   $modal.open({
        //     templateUrl: 'app/partenaire/pj/confirmationModal.html',
        //     controller: function($scope, $modalInstance) {
        //       $scope.ok = function() {
        //         $modalInstance.close();
        //       };
        //     }
        //   });
        // });
      }
    };
  });
