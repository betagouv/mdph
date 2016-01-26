'use strict';

angular.module('impactApp')
  .controller('RequestListCtrl', function($scope,
                                          $window,
                                          $state,
                                          $cookies,
                                          $http,
                                          user,
                                          banette,
                                          currentUser,
                                          currentSecteur,
                                          requests,
                                          RequestResource,
                                          secteurs,
                                          $modal,
                                          $q) {
    $scope.requests = requests;
    $scope.secteurs = secteurs;

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

    $scope.transfer = function(requests, transferSecteur) {
      var selectedRequests = _.filter(requests, 'isSelected');
      var transferPromises = _.map(selectedRequests, function(request) {
        request.secteur = transferSecteur;
        return RequestResource.update(request).$promise;
      });

      $q.all(transferPromises).then(function() {
        $state.go('.', {}, {reload: true});
      });

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

    $scope.open = function() {
      if (_.find($scope.requests, 'isSelected')) {
        var modalInstance = $modal.open({
          animation: false,
          templateUrl: 'app/dashboard/requests/list/modalSecteurs.html',
          controller: 'ModalSecteursCtrl',
          resolve: {
            secteurs: function() {
              //on retire 'sans secteur' et le secteur courant
              var tmp = _.filter($scope.secteurs, function(secteur) {
                return (secteur.mdph) && (secteur._id !== $scope.currentSecteur._id);
              });

              return tmp;
            }
          }
        });

        modalInstance.result.then(
          function(selectedItem) {
            $scope.transfer($scope.requests, selectedItem);
          }
        );
      }

    };

  })
  .controller('ModalSecteursCtrl', function($scope, $modalInstance, secteurs) {
    $scope.secteurs = secteurs;
    $scope.secteurId = '';

    $scope.transfer = function() {
      $modalInstance.close($scope.secteurId);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
