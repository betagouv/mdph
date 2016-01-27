'use strict';

angular.module('impactApp')
  .controller('RequestListCtrl', function($scope, $window, $state, $cookies, $http, user, banette, currentUser, currentSecteur, requests) {
    $scope.requests = requests;

    $scope.user = user;
    $scope.banette = banette;
    $scope.currentSecteur = currentSecteur;

    var token = $cookies.get('token');

    $scope.title = user ?
      'Demandes assignées à ' + user.name :
      'Demandes concernant le secteur ' + currentSecteur.name;

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

    $scope.assigner = function(requests) {
      requests.forEach(function(request) {
        if (request.isSelected) {
          request.evaluator = currentUser._id;
          return $http.put('/api/requests/' + request.shortId, request).then(function() {
            $scope.$emit('assign-request');
          });
        }
      });

      $state.go('dashboard.requests.user', {userId: $scope.currentUser._id});
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
            $window.open('api/requests/' + request.shortId + '/' + (request.user.name).toLowerCase() + '.' + request.shortId + '.pdf?access_token=' + token);
          }
        });
      }
    };
  });
