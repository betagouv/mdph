'use strict';

angular.module('impactApp')
  .controller('HeaderCtrl', function($scope, $timeout, $cookies, request) {
    $scope.token = $cookies.get('token');
    $scope.pdfName = (request.user.formAnswers.identites.beneficiaire.nom).toLowerCase() +
                     '_' + (request.user.formAnswers.identites.beneficiaire.prenom).toLowerCase() +
                     '_' + request.shortId + '.pdf';

    $scope.$on('saving', function(event, status) {
      $scope.saving = status;
      if (status === 'success') {
        $timeout(function() {
          $scope.saving = false;
        }, 1500);
      }
    });
  });
