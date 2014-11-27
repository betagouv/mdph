'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function ($scope, $http, documents) {
  	$scope.documents = documents;
  	$scope.documentTypes = [];

    $scope.onFileSelect = function($files, file) {
      //$files: an array of files selected, each file has name, size, and type.
      var file = $files[0];
      $http.post('api/requests/' + $scope.request.shortId + '/document', {
        stepName: 'complementaire',
        documentName: file.name,
        file: file.name
      }).then(function(res) {
        // TODO
      });
    };

    $scope.getRequestedDocuments = function(request) {
      if (request && request.steps) {
        var stepsByName = _.indexBy(request.steps, 'name');
        if (stepsByName.complementaire) {
          return stepsByName.complementaire.files;
        }
      }
    };

    /**
  	for (var i = $scope.documents.length - 1; i >= 0; i--) {
      var documentType = {
      	type: $scope.documents[i].type,
      	label: $scope.documents[i].typeLabel
      };
      var existingType = false;
      for(var j = $scope.documentTypes.length - 1; j >= 0 && existingType === false; j--){
      	if($scope.documentTypes[j].type === documentType.type){
      		existingType = true;
      	}
      }
      if (!existingType){
      	$scope.documentTypes.push(documentType);
      }
    }
    */
  });
