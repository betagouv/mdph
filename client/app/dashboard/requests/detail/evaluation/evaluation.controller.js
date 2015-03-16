'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function ($scope, $modal, sections, GevaService) {
    $scope.sections = sections;
    $scope.computeCompletion = GevaService.computeCompletion;

    $scope.afficherSynthese = function () {
      $modal.open({
        templateUrl: 'app/dashboard/requests/detail/evaluation/synthese.html',
        controller: 'ModalSyntheseCtrl',
        resolve: {
          sections: function () {
            return $scope.sections;
          }
        }
      });
    };
  })
  .controller('ModalSyntheseCtrl', function ($scope, $modalInstance, sections) {
    $scope.sections = sections;
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
