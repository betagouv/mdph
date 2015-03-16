'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function ($scope, $modal, sections, GevaService, prestations) {
    $scope.sections = sections;
    $scope.computeCompletion = GevaService.computeCompletion;

    $scope.afficherSynthese = function () {
      $modal.open({
        templateUrl: 'app/dashboard/requests/detail/evaluation/synthese.html',
        controller: 'ModalSyntheseCtrl',
        resolve: {
          prestations: function () {
            return prestations;
          }
        }
      });
    };
  })
  .controller('ModalSyntheseCtrl', function ($scope, $modalInstance, prestations) {
    $scope.prestations = prestations;
    $scope.prestaDemande = [
      {
        label: '',
        eligibilite: '',
        motivation: ''
      }
    ];
    $scope.prestaAutre = [
      {
        label: '',
        motivation: ''
      }
    ];
    $scope.preconisations = '';

    $scope.ajouterPrestaDemande = function(){
      $scope.prestaDemande.push({
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
      $scope.prestaAutre.push({
        label: '',
        motivation: ''
      });
    };

    $scope.ok = function() {
      $modalInstance.close();
    };
  });
