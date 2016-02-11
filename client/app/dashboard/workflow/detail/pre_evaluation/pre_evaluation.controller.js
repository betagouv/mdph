'use strict';

angular.module('impactApp')
  .filter('age', function() {
    function calculAge(dateNaiss) {
      var ageDiff = Date.now() - Date.parse(dateNaiss);
      var ageDate = new Date(ageDiff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function(dateNaiss) {
      return calculAge(dateNaiss);
    };
  })
  .controller('RequestPreEvaluationCtrl', function($scope, $http, $window, $cookies, currentUser, currentMdph, request) {
    $scope.token = $cookies.get('token');
    $scope.currentMdph = currentMdph;
    $scope.currentUser = currentUser;
    $scope.pdfName = (request.formAnswers.identites.beneficiaire.nom).toLowerCase() +
                    '_' + (request.formAnswers.identites.beneficiaire.prenom).toLowerCase() +
                    '_' + request.shortId + '.pdf';

    $scope.resendMail = function() {
      $http.get('api/requests/' + request.shortId + '/resend-mail').then(function() {
        $window.alert('Mail renvoyé avec succès');
      });
    };
  });
