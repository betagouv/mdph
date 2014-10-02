'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms.detail.obligatoire', {
        url: '/obligatoire',
        templateUrl: 'app/dashboard/forms/detail/obligatoire/obligatoire.html',
        controller: function($scope) {
          $scope.files = _.find($scope.form.steps, {'name': 'obligatoire'}).files;
          $scope.saveValid = function(file) {
            file.state = 'valide';
          };

          $scope.saveError = function(file) {
            file.state = 'erreur';
          };
        }
      });
  });
