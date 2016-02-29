'use strict';

angular.module('impactApp')
  .controller('WorkflowDetailCtrl', function($scope, $state, $cookies, $modal, request) {
    $scope.request = request;
    $scope.token = $cookies.get('token');
    $scope.pdfName = (request.formAnswers.identites.beneficiaire.nom).toLowerCase() +
                    '_' + (request.formAnswers.identites.beneficiaire.prenom).toLowerCase() +
                    '_' + request.shortId + '.pdf';

    $scope.toggleDetail = function() {
      $scope.showDetail = !$scope.showDetail;
    };
  });
