'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('FormCtrl', function ($scope, $window) {

	$scope.acceptConditions = false;
  $scope.data = { 'mdph' : 'calvados' };

	$scope.processForm = function() {
		$window.alert(JSON.stringify($scope.data));
	};
});
