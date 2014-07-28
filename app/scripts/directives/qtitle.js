'use strict';

/**
 * @ngdoc directive
 * @name impactApp.directive:qtitle
 * @description
 * # qtitle
 */
angular.module('impactApp')
  .directive('qtitle', function () {
    return {
      templateUrl: 'views/partials/qtitle.html',
      restrict: 'E',
      controller: function($scope, $state) {
        $scope.getPageHeader = function() {
          if ($state.includes('**.contexte.**')) {
            return 'Pour commencer';
          }
          if ($state.includes('**.votre_aidant.**')) {
            return 'Situation et besoins de l\'aidant familial';
          }
          return $scope.estRepresentant() ? 'Projet de vie de ' + $scope.getName() : 'Votre projet de vie';
        };
      }
    };
  });
