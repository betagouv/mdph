'use strict';

angular.module('impactApp')
  .controller('WorkflowListCtrl', function(
    $cookies, $window, $modal, $q, $state,
    RequestService, RequestResource, MdphResource, status, requests, groupedByAge, currentMdph) {

    this.token = $cookies.get('token');
    this.status = status;
    this.requests = requests;
    this.groupedByAge = groupedByAge;
    this.groups = [
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

    function actionOnSelectedRequests(requests, action, success) {
      const selectedRequests = _.filter(requests, 'isSelected');
      const actionPromises = _.map(selectedRequests, action);

      $q.all(actionPromises).then(success);
    }

    function transfer(requests, selectedSecteur) {
      const transfer = function(request) {
        request.secteur = selectedSecteur._id;
        return RequestResource.update(request).$promise;
      };

      const afterTransfer = function() {
        $state.go('.', {}, {reload: true});
      };

      actionOnSelectedRequests(requests, transfer, afterTransfer);
    }

    function archiveRequests(requests) {
      const archive = function(request) {
        request.status = 'archive';
        return RequestResource.update(request).$promise;
      };

      const afterTransfer = function() {
        $state.go('.', {}, {reload: true});
      };

      actionOnSelectedRequests(requests, archive, afterTransfer);
    }

    this.selectAll = () => {
      const action = !this.allSelected();

      this.requests.forEach(function(request) {
        request.isSelected = action;
      });
    };

    this.allSelected = () => {
      return _.every(requests, 'isSelected');
    };

    this.openTransferModal = () => {
      if (_.find(this.requests, 'isSelected')) {

        const modalInstance = $modal.open({
          animation: false,
          templateUrl: 'app/dashboard/workflow/list/modalSecteurs.html',
          controller: 'ModalSecteursCtrl',
          resolve: {
            secteurs: function(MdphResource) {
              return MdphResource.querySecteursList({zipcode: currentMdph.zipcode}).$promise;
            }
          }
        });

        modalInstance.result.then((selectedItem) => transfer(this.requests, selectedItem));
      }
    };

    this.download = () => {
      const download = (request) => {
        const beneficiaire = request.formAnswers.identites.beneficiaire;
        const pdfName = beneficiaire.nom.toLowerCase() +
                        '_' + beneficiaire.prenom.toLowerCase() +
                        '_' + request.shortId + '.pdf';
        $window.open('api/requests/' + request.shortId + '/pdf/' + pdfName + '?access_token=' + this.token);
      };

      actionOnSelectedRequests(requests, download);
    };

    this.openArchiveModal = function() {
      if (_.find(this.requests, 'isSelected')) {
        const modalInstance = $modal.open({
          animation: false,
          templateUrl: 'app/dashboard/workflow/list/modalArchive.html',
          controller: 'ModalArchiveCtrl'
        });

        modalInstance.result.then(() => archiveRequests(this.requests));
      }
    };

    this.refresh = () => {
      this.isRefreshing = true;
      MdphResource.queryRequests({zipcode: currentMdph.zipcode, status: status}).$promise.then((requests) => {
        this.requests = requests;
        this.groupedByAge = RequestService.groupByAge(this.requests);
        this.isRefreshing = false;
      });
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
