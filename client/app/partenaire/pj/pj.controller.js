'use strict';

angular.module('impactApp')
  .controller('PieceJointeCtrl', function ($scope, $http, documents, Partenaire) {
  	$scope.documents = documents;
  	$scope.documentTypes = [];

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
        console.log("Youpi !");
      }, function(error){
        console.log(error);
      });
    };
  });
