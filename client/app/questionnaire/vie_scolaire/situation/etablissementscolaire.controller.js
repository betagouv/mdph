'use strict';

angular.module('impactApp')
  .controller('EtablissementScolaireCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('scolaire', 'etablissement', $scope.formAnswers);

    if (angular.isUndefined($scope.sectionModel.etablissement)) {
      $scope.sectionModel.etablissement = {
        valeur: false,
        etablissements: [
          { 'name': '' }
        ]
      };
    }

    $scope.model = $scope.sectionModel.etablissement;
    $scope.addEtablissement = function() {
      $scope.model.etablissements.push(
        { 'name': '' }
      );
    };

    $scope.checkNextStep = function() {
      for (var i = 0; i < $scope.model.etablissements.length; i++) {
        if ($scope.model.etablissements[i].name !== '') {
          return false;
        }
      }
      return true;
    };

    $scope.nextStep = function() {
      $state.go('^.^.vos_attentes.structure');
    };
  });
