'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('QuestionCtrl', function ($scope, $window) {

	$scope.acceptConditions = false;
  $scope.data = { 'mdph' : 'calvados' };

	$scope.processForm = function() {
		$window.alert('Bravo !');
	};
  });
