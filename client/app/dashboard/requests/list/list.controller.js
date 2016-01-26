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
      var action = !$scope.allSelected();

      $scope.requests.forEach(function(request) {
        request.isSelected = action;
      });
    };

    $scope.allSelected = function() {
      return _.every(requests, 'isSelected');
    };

    function actionOnSelectedRequests(requests, action, success) {
      var selectedRequests = _.filter(requests, 'isSelected');
      var transferPromises = _.map(selectedRequests, action);
      $q.all(transferPromises).then(success);
    }

    $scope.assigner = function(requests) {
      var assign = function(request) {
        request.evaluator = currentUser._id;
        return request.$update().$promise;
      };

      var goDashboard = function() {
        $state.go('dashboard.requests.user', {userId: $scope.currentUser._id});
      };

      actionOnSelectedRequests(requests, assign, goDashboard);
    };

    $scope.transfer = function(requests, transferSecteur) {
      var transfer = function(request) {
        request.secteur = transferSecteur;
        return request.$update().$promise;
      };

      var refresh = function() {
        $state.go('.', {}, {reload: true});
      };

      actionOnSelectedRequests(requests, transfer, refresh);
    };

    $scope.download = function(requests) {
      var download = function(request) {
        $window.open('api/requests/' + request.shortId + '/questionnaire.pdf?access_token=' + token);
      };

      actionOnSelectedRequests(requests, download);
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
              return _.filter($scope.secteurs, function(secteur) {
                return (secteur.mdph) && (secteur._id !== $scope.currentSecteur._id);
              });
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
