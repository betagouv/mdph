'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EnvoiCtrl
 * @description
 * # EnvoiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, isAdult, $filter, $state, getDroits, $http, $modal, Auth) {

    $scope.justificatifStr = FormService.estRepresentant($scope.formAnswers) ?
      'de votre justificatif d\'identité ainsi que celui de la personne handicapée' :
      'de votre justificatif d\'identité';

    $scope.showAdult = isAdult();

    var computePrestations = function() {
      var prestations = [];
      var defaultPrestations = getDroits($scope.formAnswers, $scope.isAdult);
      var mesPrestations = $scope.formAnswers.vie.answers.situation.answers.mesPrestations;

      angular.forEach(defaultPrestations, function(category) {
        angular.forEach(category.prestations, function(prestation) {
          prestation.type = category.type;
          if (angular.isDefined(prestation.shouldHave) && prestation.shouldHave()) {
            prestations.push(prestation);
          } else {
            angular.forEach(mesPrestations, function(droit) {
              if (prestation.id === droit.id) {
                prestation.description = getDescription(droit);
                prestations.push(prestation);
              }
            });
          }
        });
      });

      angular.forEach(mesPrestations, function(droit) {
        if (droit.type === 'presta-autre') {
          var droitObj = { label: droit.label, description: getDescription(droit), type: 'presta-autre'};
          prestations.push(droitObj);
        }
      });

      return prestations;
    };

    var getDescription = function(droit) {
      if (!droit.date) {
        return 'Etude du renouvellement de votre droit.';
      }
      return 'Etude du renouvellement de votre droit se terminant le ' + $filter('date')(droit.date, 'dd/MM/yyyy') + '.';
    };

    $scope.prestations = computePrestations();

    $scope.saveForm = function() {
      if (Auth.isLoggedIn()) {
        $http.put('/api/forms/mine', $scope.formAnswers)
        .success(function() {
          $state.go('demande');
        });
      } else {
        $modal.open({
          templateUrl: '/components/modal/login.html',
          backdrop: true,
          windowClass: 'modal',
          controller: 'ModalLoginCtrl',
          resolve: {
            user: function () {
              return $scope.user;
            }
          }
        });
      }
    };
  });
