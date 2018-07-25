'use strict';

angular.module('impactApp')
  .controller('WorkflowListCtrl', function($scope,
    $cookies, $window, $modal, $q, $state, $rootScope,
    RequestService, RequestResource, MdphResource, userId, status, requests,
    groupedByAge, currentMdph, currentUser, banetteUser, toastr) {
    this.token = $cookies.get('token');
    this.status = status;
    this.requests = requests;
    this.groupedByAge = groupedByAge;
    this.banetteUser = banetteUser;
    $scope.layoutctrl.currentUser = currentUser;

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

    this.showDownloadAndDeleteButtons = (this.status === 'validee' || this.status === 'irrecevable');

    $scope.currentMenu(userId, status) ;

    this.deselect = () => {
      this.requests.forEach(function(request) {
        if (request.isSelected) {
          request.isSelected = false;
        }
      });
    };

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
        .then(() => request.evaluators = evaluators);
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
                  if (assignedEvaluator._id === evaluator._id) {
                    evaluator.isSelected = true;
                  }
                });

              });
              return result;
            });
          }
        }
      });

      modalInstance.result.then(evaluators => transfer(request, evaluators)).then(() => {
        this.refresh();
        $rootScope.$emit('event:updateRequestCount');
      });
    };

    this.downloadRequests = function() {

      var selectedRequests = _.reduce(this.requests, function(selectedRequests, request) {
          if (request.isSelected) {
            selectedRequests.push(request.shortId);
          }

          return selectedRequests;
        }, []);

      if (selectedRequests.length === 1) {
        var request = _.find(this.requests, 'isSelected');
        request.isDownloaded = 'true';
        RequestResource.update(request).$promise.then(result => {
          $window.open('api/requests/' + result.shortId + '/pdf/agent?access_token=' + this.token);
        });
      } else {
        if (selectedRequests.length > 1) {
          const update = function(request) {
            request.isDownloaded = 'true';
            return RequestResource.update(request).$promise;
          };

          const download =  function() {
            $window.open('api/requests/download?short_ids=' + JSON.stringify(selectedRequests) + '&access_token=' + $cookies.get('token'));
          };

          actionOnSelectedRequests(requests, update, download);
        }
      }
    };

    function irrecevableRequests(requests) {
      const irrecevable = function(request) {
        request.status = 'irrecevable';
        return RequestResource.update(request).$promise;
      };

      const afterTransfer = function() {
        $state.go('.', {}, {reload: true});
      };

      actionOnSelectedRequests(requests, irrecevable, afterTransfer);
    }

    this.openIrrecevableModal = () => {
      if (_.find(this.requests, 'isSelected')) {
        const modalInstance = $modal.open({
          animation: false,
          templateUrl: 'app/dashboard/workflow/list/modalIrrecevable.html',
          controllerAs: 'modalIrrecevableCtrl',
          controller($modalInstance) {
            this.confirm = function() {
              $modalInstance.close();
            };

            this.cancel = function() {
              $modalInstance.dismiss('cancel');
            };
          }
        });

        modalInstance.result.then(() => irrecevableRequests(this.requests));
      }
    };

    this.refresh = () => {
      this.isRefreshing = true;
      MdphResource.queryRequests({zipcode: currentMdph.zipcode, status: status}).$promise.then((requests) => {
        this.requests = requests;
        this.groupedByAge = RequestService.groupByAge(this.requests);
        this.isRefreshing = false;
      });
      $state.go('.', {}, {reload: true});
    };

    this.allSelectedRequestsDownloadOpenModal = function() {
      if (_.find(this.requests, 'isSelected')) {

        var selectedRequests = _.reduce(this.requests, function(selectedRequests, request) {
          if (request.isSelected) {
            selectedRequests.push(request);
          }

          return selectedRequests;
        }, []);

        let SelectedRequestsDownload = true;
        angular.forEach(selectedRequests, function(request) {
          if (request.isDownloaded === undefined || !request.isDownloaded) {
            SelectedRequestsDownload = false;
            return;
          }
        });

        if (SelectedRequestsDownload) {

          $modal.open({
            templateUrl: 'app/dashboard/workflow/detail/modalDelete.html',
            controllerAs: 'modalDeleteCtrl',
            size: 'md',
            controller($modalInstance, $state) {
              this.requests = selectedRequests;
              this.delete = function() {
                const remove = function(request) {
                  return RequestResource.partialDelete(request).$promise;
                };

                const closeModal = function() {
                  $modalInstance.close();
                  $state.go('.', {}, {reload: true});
                };

                actionOnSelectedRequests(this.requests, remove, closeModal);
              };

              this.cancel = function() {
                $modalInstance.dismiss('cancel');
              };
            }
          });
        } else {
          this.deselect();
          toastr.error('Les demandes n\' ont pas pu être supprimées car au moins l\'une d\'entre elles n\'a pas été téléchargée');
        }
      }
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
  });
