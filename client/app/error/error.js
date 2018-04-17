'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('403', {
        url: '/unauthorized',
        parent: 'layout',
        templateUrl: 'app/error/error.html',
        data: {
          title: 'Accès refusé',
          text: 'Vous n\'êtes pas autorisé à consulter cette page.'
        },
        controllerAs: 'errorCtrl',
        controller: function($scope, $state) {
          $scope.title = $state.current.data.title;
          $scope.text = $state.current.data.text;
        }
      });
  });
