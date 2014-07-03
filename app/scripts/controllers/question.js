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

	$scope.formData = { 'mdph' : 'calvados'};
	$scope.acceptConditions = false;

	$scope.processForm = function() {
		$window.alert('Bravo !');
	};
  });
