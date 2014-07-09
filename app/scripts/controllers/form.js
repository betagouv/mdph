'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('FormCtrl', function ($scope) {

	$scope.acceptConditions = false;
  $scope.data = { 'mdph' : 'calvados' };

	$scope.processForm = function() {
		console.log($scope.data);
	};
});
