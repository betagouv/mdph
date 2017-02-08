'use strict';

angular.module('impactApp')
  .controller('WorkflowListCtrl', function($scope, $cookies, $window, $modal, $q, $state, RequestResource, status, requests, groupedByAge, currentMdph) {
    $scope.status = status;
    $scope.requests = requests;
    $scope.groupedByAge = groupedByAge;
    $scope.groups = [
      {
        id: 'new',
        title: 'Nouvelles demandes'
      },
      {
        id: 'standard',
        title: 'Envoyées il y a plus d\'un mois'
      },
      {
        id: 'old',
        title: 'Envoyées il y a plus de trois mois'
      }
    ];

    var token = $cookies.get('token');

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
      var actionPromises = _.map(selectedRequests, action);

      $q.all(actionPromises).then(success);
    }

    function transfer(requests, selectedSecteur) {
      var transfer = function(request) {
        request.secteur = selectedSecteur._id;
        return RequestResource.update(request).$promise;
      };

      var afterTransfer = function() {
        $state.go('.', {}, {reload: true});
      };

      actionOnSelectedRequests(requests, transfer, afterTransfer);
    }

    $scope.openTransferModal = function() {
      if (_.find($scope.requests, 'isSelected')) {

        var modalInstance = $modal.open({
          animation: false,
          templateUrl: 'app/dashboard/workflow/list/modalSecteurs.html',
          controller: 'ModalSecteursCtrl',
          resolve: {
            secteurs: function(MdphResource) {
              return MdphResource.querySecteursList({zipcode: currentMdph.zipcode}).$promise;
            }
          }
        });

        modalInstance.result.then(
          function(selectedItem) {
            transfer($scope.requests, selectedItem);
          }
        );
      }
    };

    $scope.download = function() {
      var download = function(request) {
        var beneficiaire = request.formAnswers.identites.beneficiaire;
        var pdfName = beneficiaire.nom.toLowerCase() +
                        '_' + beneficiaire.prenom.toLowerCase() +
                        '_' + request.shortId + '.pdf';
        $window.open('api/requests/' + request.shortId + '/pdf/' + pdfName + '?access_token=' + token);
      };

      actionOnSelectedRequests(requests, download);
    };

    function archiveRequests(requests) {
      var archive = function(request) {
        request.status = 'archive';
        return RequestResource.update(request).$promise;
      };

      var afterTransfer = function() {
        $state.go('.', {}, {reload: true});
      };

      actionOnSelectedRequests(requests, archive, afterTransfer);
    }

    $scope.openArchiveModal = function() {
      if (_.find($scope.requests, 'isSelected')) {
        var modalInstance = $modal.open({
          animation: false,
          templateUrl: 'app/dashboard/workflow/list/modalArchive.html',
          controller: 'ModalArchiveCtrl'
        });

        modalInstance.result.then(
          function() {
            archiveRequests($scope.requests);
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
  })
  .controller('ModalArchiveCtrl', function($scope, $modalInstance) {
    $scope.archive = function() {
      $modalInstance.close();
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
