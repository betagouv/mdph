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
  .controller('RequestPreEvaluationCtrl', function ($scope, $http, $cookieStore, $sce, request, recapitulatif, DroitService, NotificationService, vieQuotidienne, prestations) {
    $scope.token = $cookieStore.get('token');
    $scope.recapitulatif = recapitulatif;
    $scope.recapitulatifHtml = $sce.trustAsHtml(recapitulatif);
    $scope.toutesPrestations = prestations;

    var familleAnswers = _.indexBy(vieQuotidienne.famille.answers, 'model');
    var situationFamiliale = familleAnswers[request.formAnswers.vie_quotidienne.famille];

    var logementAnswers = _.indexBy(vieQuotidienne.logement.answers, 'model');
    var situationLogement = logementAnswers[request.formAnswers.vie_quotidienne.logement];

    if (situationFamiliale) {
      if(situationFamiliale.labelRecap){
        $scope.situationFamiliale = situationFamiliale.labelRecap;
      } else {
        $scope.situationFamiliale = situationFamiliale.label;
      }
    }

    if (situationLogement) {
      if(situationLogement.labelRecap){
        $scope.situationLogement = situationLogement.labelRecap;
      } else {
        $scope.situationLogement = situationLogement.label;
      }
    }

    if(request.renouvellement){
      $scope.renouvellement = 'Renouvellement';
    } else {
      $scope.renouvellement = 'Première demande';
    }

    DroitService.compute(request.formAnswers).success(function(result) {
      $scope.prestations = result;
    });

     $scope.isSelected = function(prestation) {
        return false === request.prestations.indexOf(prestation.label) >= 0;
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
