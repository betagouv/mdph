'use strict';

angular.module('impactApp')
  .controller('EmployeurCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'employeur', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.employeur)) {
      $scope.sectionModel.employeur = {
        nom: {label: 'Nom', value: ''},
        adresse: {label: 'Adresse', value: ''},
        medecin: {label: 'Service/Médecin', value: ''}
      };
    }

    $scope.model = $scope.sectionModel.employeur;

    $scope.checkNextStep = function(value) {
      return !value.nom.value || !value.adresse.value;
    };

    $scope.nextStep = function() {
      $state.go('^.emploi.nom_poste');
    };
  });
