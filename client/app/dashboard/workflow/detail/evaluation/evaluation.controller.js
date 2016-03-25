'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function($scope, $modal, $cookies, sections, model, GevaService, allPrestations, currentRequest, synthese) {
    $scope.model = model;
    $scope.sections = sections;
    $scope.request = currentRequest;
    $scope.token = $cookies.get('token');

    if (!currentRequest.synthese) {
      currentRequest.synthese = {};
    }

    $scope.afficherSynthese = function() {
      $modal.open({
        templateUrl: 'app/dashboard/workflow/detail/evaluation/synthese.html',
        controller: 'ModalSyntheseCtrl',
        size: 'lg',
        resolve: {
          prestations: function() {
            return allPrestations;
          },

          request: function() {
            return currentRequest;
          },

          synthese: function() {
            return synthese;
          }
        }
      });
    };
  })
  .controller('ModalSyntheseCtrl', function($scope, $modalInstance, prestations, request) {
    $scope.prestations = prestations;
    if (!request.synthese.proposition) {
      request.synthese.proposition = {};
    }

    $scope.proposition = request.synthese.proposition;
    if (!$scope.proposition.prestaDemande) {
      $scope.proposition.prestaDemande = [
        {
          label: '',
          motivation: ''
        }
      ];
    }

    if (!$scope.proposition.prestaAutre) {
      $scope.proposition.prestaAutre = [
        {
          label: '',
          motivation: ''
        }
      ];
    }

    if (!$scope.proposition.preconisations) {
      $scope.proposition.preconisations = '';
    }

    $scope.ajouterPrestaDemande = function() {
      $scope.proposition.prestaDemande.push({
        label: '',
        eligibilite: '',
        motivation: ''
      });
    };

    $scope.retirerPresta = function(type) {
      var lastIndex = type.indexOf(_.last(type));
      type.splice(lastIndex, 1);
    };

    $scope.ajouterPrestaAutre = function() {
      $scope.proposition.prestaAutre.push({
        label: '',
        motivation: ''
      });
    };

    $scope.ok = function() {
      request.synthese.proposition = $scope.proposition;
      request.$update();
      $modalInstance.close();
    };
  });
