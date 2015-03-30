'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function ($scope, $modal, sections, GevaService, prestations, request) {
    $scope.sections = sections;
    $scope.computeCompletion = GevaService.computeCompletion;

    $scope.afficherSynthese = function () {
      $modal.open({
        templateUrl: 'app/dashboard/requests/detail/evaluation/synthese.html',
        controller: 'ModalSyntheseCtrl',
        size: 'lg',
        resolve: {
          prestations: function () {
            return prestations;
          },
          request : function () {
            return request;
          }
        }
      });
    };
  })
  .controller('ModalSyntheseCtrl', function ($scope, $modalInstance, prestations, request) {
    $scope.prestations = prestations;
    if (!request.synthese) {
      request.synthese = {};
    }
    $scope.synthese = request.synthese;
    if (!$scope.synthese.prestaDemande) {
      $scope.synthese.prestaDemande = [
        {
          label: '',
          motivation: ''
        }
      ];
    }

    if (!$scope.synthese.prestaAutre) {
      $scope.synthese.prestaAutre = [
        {
          label: '',
          motivation: ''
        }
      ];
    }

    if (!$scope.synthese.preconisations) {
      $scope.synthese.preconisations = '';
    }



    $scope.ajouterPrestaDemande = function(){
      $scope.synthese.prestaDemande.push({
        label: '',
        eligibilite: '',
        motivation: ''
      });
    };

    $scope.retirerPresta = function(type){
      var lastIndex = type.indexOf(_.last(type));
      type.splice(lastIndex, 1);
    };

    $scope.ajouterPrestaAutre = function(){
      $scope.synthese.prestaAutre.push({
        label: '',
        motivation: ''
      });
    };

    $scope.ok = function() {
      request.synthese = $scope.synthese;
      request.$update();
      $modalInstance.close();
    };
  });
