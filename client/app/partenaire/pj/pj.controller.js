'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function ($scope, documents) {
  	$scope.documents = documents;
  	$scope.documentTypes = [];

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
  });
