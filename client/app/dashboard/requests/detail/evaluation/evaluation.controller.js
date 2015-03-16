'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function ($scope, sections, GevaService) {
    $scope.sections = sections;
    $scope.computeCompletion = GevaService.computeCompletion;
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

    $scope.ajouterPrestaAutre = function(){
      $scope.prestaAutre.push({
        label: '',
        motivation: ''
      });
    };

    $scope.retirerPresta = function(type){
      var lastIndex = type.indexOf(_.last(type));
      type.splice(lastIndex, 1);
    };

  });
