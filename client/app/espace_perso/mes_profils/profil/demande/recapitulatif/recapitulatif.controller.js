'use strict';

angular.module('impactApp')
  .controller('RecapitulatifCtrl', function($scope, $cookies, request) {
  $scope.token = $cookies.get('token');
  $scope.pdfName = (request.formAnswers.identites.beneficiaire.nom).toLowerCase() +
                  '_' + (request.formAnswers.identites.beneficiaire.prenom).toLowerCase() +
                  '_' + request.shortId + '.pdf';
});
