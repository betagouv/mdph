'use strict';

angular.module('impactApp')
  .directive('keywordInput', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/keyword-input/keyword-input.html',
    scope: {
      labelWidth: '=',
      inputWidth: '=',

      showHelp: '=',
      inputLabel: '=',
      keywordLabel: '=',

      keywords: '=',
      isMongo: '=areKeywordsMongoDocuments',
      selectedKeywords: '=',
      canAddKeywords: '='
    },
    controller: function($scope) {

      if ($scope.isMongo) {
        $scope.availableKeyword = _.clone($scope.keywords, true);
      } else {
        $scope.availableKeyword = $scope.keywords;
      }

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
        if ($scope.showNew) {
          $timeout(function() {
            var element = document.getElementById(id);
            if (element) {
              element.focus();
            }
          });
        }
      };

      $scope.isSelected = function(keyword) {
        if ($scope.isMongo) {
          return false === _.where($scope.selectedKeywords, {'_id': keyword._id}).length > 0;
        } else {
          return false === $scope.selectedKeywords.indexOf(keyword) >= 0;
        }
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
