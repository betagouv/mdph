'use strict';

angular.module('impactApp')
  .controller('VosAttentesScolairesCtrl', function ($scope, FormService) {
    $scope.title = FormService.estRepresentant($scope.formAnswers) ? 'Ses attentes en matière de vie scolaire / étudiante' : 'Vos attentes en matière de vie scolaire / étudiante';

    if (angular.isUndefined($scope.sectionModel.attentes)) {
      $scope.sectionModel.attentes = {
        label: 'Vos attentes en matière de vie scolaire / étudiante',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.attentes.answers;
  });
