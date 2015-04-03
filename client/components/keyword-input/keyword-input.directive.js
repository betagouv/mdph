'use strict';

angular.module('impactApp')
  .directive('keywordInput', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/keyword-input/keyword-input.html',
    scope: {
      inputLabel: '=',
      keywordName: '=',
      keywords: '=',
      selectedKeywords: '=',
      labelWidth: '=',
      inputWidth: '=',
      showHelp: '=',
      showNew: '='
    },
    controller: function($scope) {
      $scope.showTags = true;

      $scope.isObject = function(keyword) {
        return typeof keyword !== 'string';
      };

      $scope.addKeyword = function(keyword) {
        var newKeyword;
        if (keyword) {
          newKeyword = keyword;
        } else {
          newKeyword = $scope.currentKeyword;
        }

        if ($scope.selectedKeywords.indexOf(newKeyword) < 0 ) {
          $scope.selectedKeywords.push(newKeyword);
        }
        $scope.currentKeyword = '';
      };

      $scope.removeKeyword = function(idx) {
        $scope.selectedKeywords.splice(idx, 1);
      };

      $scope.setFocusOnInput = function(id) {
        $timeout(function() {
          var element = document.getElementById(id);
          if (element) {
            element.focus();
          }
        });
      };

      $scope.toggleShowTags = function() {
        $scope.showTags = !$scope.showTags;
      };

      $scope.isSelected = function(keyword) {
        return false === $scope.selectedKeywords.indexOf(keyword) >= 0;
      };
    }
  };
});

angular.module('impactApp')
  .directive('ngInputEnter', function () {
  return function (scope, element, attrs) {
    element.bind('keydown keypress', function (event) {
      if(event.which === 13 || event.which === 9) {
        scope.$apply(function (){
          scope.$eval(attrs.ngInputEnter);
        });

        event.preventDefault();
      }
    });
  };
});
