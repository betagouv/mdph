'use strict';

angular.module('impactApp')
  .controller('RecapCtrl', function ($scope, currentForm) {
    $scope.form = currentForm;

    $scope.sections = ['Contexte', 'Vie quotidienne', 'Vie scolaire', 'Vie professionnelle', 'Aidant familial'];

  });
