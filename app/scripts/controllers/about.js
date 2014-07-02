'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
