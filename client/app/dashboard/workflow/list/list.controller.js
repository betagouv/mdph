'use strict';

angular.module('impactApp')
  .controller('WorkflowListCtrl', function(
    $cookies, $window, $modal, $q, $state,
    RequestService, RequestResource, MdphResource, status, requests, groupedByAge, currentMdph) {

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

    const token = $cookies.get('token');

    this.selectAll = () => {
      const action = !this.allSelected();

      this.requests.forEach(function(request) {
        request.isSelected = action;
      });
    };

    this.allSelected = function() {
      return _.every(requests, 'isSelected');
    };

    function actionOnSelectedRequests(requests, action, success) {
      const selectedRequests = _.filter(requests, 'isSelected');
      const actionPromises = _.map(selectedRequests, action);

      $q.all(actionPromises).then(success);
    }

    function transfer(request, evaluators) {
      const evaluatorsId = evaluators.map(evaluator => evaluator._id);

      return RequestResource
        .updateLinkedEvaluators({shortId: request.shortId}, evaluatorsId)
        .$promise
        .then(res => {
          request.evaluators = evaluators;
        });
    }

    this.openTransferModal = (request) => {
      const modalInstance = $modal.open({
        animation: false,
        templateUrl: 'app/dashboard/workflow/list/modalAssign.html',
        controller: 'ModalAssignCtrl',
        resolve: {
          evaluators: function(MdphResource) {
            return MdphResource.queryUsers({zipcode: currentMdph.zipcode}).$promise.then(result => {
              result.forEach(evaluator => {
                request.evaluators.forEach(assignedEvaluator => {
                  if (assignedEvaluator._id == evaluator._id) {
                    evaluator.isSelected = true;
                  }
                });

              });
              return result;
            });
          }
        }
      });

      modalInstance.result.then(evaluators => transfer(request, evaluators));
    };

    this.download = function() {
      const download = function(request) {
        const beneficiaire = request.formAnswers.identites.beneficiaire;
        const pdfName = beneficiaire.nom.toLowerCase() +
                        '_' + beneficiaire.prenom.toLowerCase() +
                        '_' + request.shortId;

        $window.open('api/requests/' + request.shortId + '/pdf/' + pdfName + '?access_token=' + this.token);
      };

      actionOnSelectedRequests(requests, download);
    };

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

    this.openArchiveModal = () => {
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
  .controller('ModalAssignCtrl', function($scope, $modalInstance, evaluators) {
    $scope.evaluators = evaluators;

    $scope.ok = function() {
      const selectedEvaluators = evaluators.filter(evaluator => evaluator.isSelected);
      $modalInstance.close(selectedEvaluators);
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
