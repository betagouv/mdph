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
  .controller('RequestPreEvaluationCtrl', function($scope, $http, $window, $cookies, currentMdph, request, documentTypes, NotificationService, prestations, prestationsQuitus) {
    $scope.token = $cookies.get('token');
    $scope.toutesPrestations = prestations;
    $scope.prestationsQuitus = prestationsQuitus;
    $scope.currentMdph = currentMdph;

    var prestationsById = _.indexBy(prestations, 'id');
    $scope.documentTypesById = _.indexBy(documentTypes, 'id');
    $scope.filesVM = _.groupBy(request.documents, 'type');

    $scope.resendMail = function() {
      $http.get('api/requests/' + request.shortId + '/resend-mail').then(function() {
        $window.alert('Mail renvoyé avec succès');
      });
    };

    $scope.getTitle = function(prestationId) {
      return prestationsById[prestationId].title;
    };

    $scope.isSelected = function(prestation) {
      return request.prestations.indexOf(prestation.label) < 0;
    };

    $scope.removePrestation = function(index) {
      request.prestations.splice(index, 1);
      request.$update();
    };

    $scope.addPrestation = function(prestation) {
      request.prestations.push(prestation.label);
      request.$update();
    };

    $scope.assigner = function() {
      request.evaluator = $scope.currentUser._id;
      request.$update(function() {
        NotificationService.createNotification(request, 'espace_perso.liste_demandes.demande.questionnaire', 'Votre demande est en cours d\'instruction.');
      });
    };
  });
