'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EnvoiCtrl
 * @description
 * # EnvoiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, isAdult, $filter, getDroits, getDocuments) {
    $scope.typeEnvoi = 'numerique';

    $scope.justificatifStr = $scope.estRepresentant() ?
      'de votre justificatif d\'identité ainsi que celui de la personne handicapée' :
      'de votre justificatif d\'identité';

    $scope.showAdult = isAdult();

    var computePrestations = function() {
      var prestations = [];

      angular.forEach(getDroits($scope.$storage), function(category) {
        angular.forEach(category.prestations, function(prestation) {
          if (prestation.shouldHave()) {
            prestations.push(prestation);
          }
        });
      });

      var mesDroits = $scope.$storage.contexte.answers.mesDroits;
      angular.forEach(mesDroits, function(droit) {
        var found = false;

        angular.forEach(prestations, function(prestation) {
          if (prestation.label === droit.name) {
            prestation.description = getDescription(droit);
            found = true;
          }
        });

        if (!found) {
          var droitObj = { label: droit.name, description: getDescription(droit) };
          angular.forEach(getDroits($scope.$storage), function(prestation) {
            if (prestation.label === droit.name) {
              droitObj.link = prestation.link;
            }
          });
          prestations.push(droitObj);
        }
      });

      return prestations;
    };

    var getDescription = function(droit) {
      return 'Etude du renouvellement de votre droit se terminant le ' + $filter('date')(droit.date, 'dd/MM/yyyy') + '.';
    };

    $scope.prestations = computePrestations();
    $scope.documents = getDocuments($scope.$storage, $scope.estRepresentant, $scope.isAdult, $scope.getName());
  });
