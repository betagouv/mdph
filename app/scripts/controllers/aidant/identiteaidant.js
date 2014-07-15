'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:IdentiteAidantCtrl
 * @description
 * # IdentiteAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('IdentiteAidantCtrl', function($scope, $state) {

    $scope.question = {
      'model': 'existe',
      'answers': [
        {'label': 'Vous souhaitez renseigner l\'aidant et exprimer ses attentes et besoins', 'value': true},
        {'label': 'Vous ne souhaitez pas le renseigner ou n\'avez pas d\'aidant', 'value': false}
      ]
    };

    $scope.nextStep = function() {
      $state.go('form.envoi');
    };
  });
