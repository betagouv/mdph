'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
