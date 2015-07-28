'use strict';

angular.module('impactApp')
  .controller('RequestListCtrl', function($scope, $window, $state, $cookieStore, user, requests, showArchiveAction) {
    $scope.requests = requests;
    $scope.user = user;
    $scope.showArchiveAction = showArchiveAction;
    var token = $cookieStore.get('token');

    $scope.selectAll = function() {
      var action;
      if ($scope.allSelected()) {
        action = false;
      } else {
        action = true;
      }

      $scope.requests.forEach(function(request) {
        request.isSelected = action;
      });
    };

    $scope.allSelected = function() {
      var test = $scope.requests.length > 0;
      $scope.requests.forEach(function(request) {
        if (!request.isSelected) {
          test = false;
        }
      });

      return test;
    };

    $scope.archive = function(requests) {
      if (requests) {
        requests.forEach(function(request) {
          if (request.isSelected) {
            request.status = 'evaluation';
            request.$save(function() {
              $state.go('.', {}, {reload: true});
            });
          }
        });
      }
    };

    $scope.download = function(requests) {
      if (requests) {
        requests.forEach(function(request) {
          if (request.isSelected) {
            $window.open('api/requests/' + request.shortId + '/questionnaire.pdf?access_token=' + token);
          }
        });
      }
    };
  });
