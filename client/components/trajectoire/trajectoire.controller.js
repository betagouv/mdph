'use strict';

angular.module('impactApp')
  .controller('TrajectoireController', function($scope) {
    $scope.getRootQuestion = function(question) {
      if ($scope.sublevel) {
        return $scope.root;
      } else {
        return question;
      }
    };

    $scope.isCurrentQuestion = function(question) {
      if ($scope.currentQuestionId !== null) {
        return ($scope.currentQuestionId === ($scope.getRootQuestion(question)).id);
      } else {
        return false;
      }
    };

    $scope.filterQuestion = function(question) {
      return ((!$scope.sublevel && !$scope.readOnly) || $scope.isCurrentQuestion(question) || question.isSelected);
    };

    $scope.toggleSelected = function(question) {
      question.isSelected = !question.isSelected;
      if (question.isSelected && $scope.sublevel) {
        $scope.root.isSelected = true;
      }
    };

    $scope.toggleCollapse = function(question) {
      if ($scope.currentQuestionId !== ($scope.getRootQuestion(question)).id) {
        $scope.currentQuestionId = ($scope.getRootQuestion(question)).id;
      } else {
        $scope.currentQuestionId = null;
      }
    };
  });
