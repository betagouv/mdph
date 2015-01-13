'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function ($scope, $http, $modal, Partenaire, request) {
    $scope.request = request;
    $scope.currentFormStep = _.find($scope.request.steps, {'name': 'complementaire'});
    $scope.files = $scope.currentFormStep.files;
    $scope.partenaire = {};

    $scope.createPartenaire = function (partenaire) {
      var newPartenaire = new Partenaire(partenaire);
      newPartenaire.$save(null, function(){
      }, function(){
        //TODO
      });
      envoiConfirmation(partenaire);
    };

    $scope.onFileSelect = function($files, currentFile) {
      //$files: an array of files selected, each file has name, size, and type.
      /*var file = $files[0];
      $http.post('api/requests/' + $scope.request.shortId + '/document', {
        stepName: $scope.currentStep.id,
        documentName: currentFile.name,
        file: file.name,
        uploaderType: 'Demandeur',
      }).then(function(res) {
        currentFile.path = res.data;
      });*/
      var file = $files[0];
      currentFile.path = file.name;
    };

    $scope.checkIfDisabled = function() {
      return !$scope.partenaire.email || !_.some($scope.files, 'path');
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
