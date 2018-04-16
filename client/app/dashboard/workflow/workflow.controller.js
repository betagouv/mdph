'use strict';

angular.module('impactApp')
  .controller('WorkflowCtrl', function($scope, $modal, $window, $cookies, $state, $http, RequestResource) {
    this.token = $cookies.get('token');
c
    this.openDeleteModal = function(request) {
      $modal.open({
        templateUrl: 'app/dashboard/workflow/detail/modalDelete.html',
        controllerAs: 'modalDeleteCtrl',
        size: 'md',
        controller($modalInstance) {
          this.shortId = request.shortId;

          this.delete = function() {
            //TODO appeler le service de suppression
            //$http.delete('/api/requests/' + this.shortId).then(() => {
              $modalInstance.close();
              if($state.includes('dashboard.workflow.detail')){
                console.info('detail');
                //TODO mettre les bons parms apres l'integration de la fiche sur le menu courant
                $state.go('dashboard.workflow.list', {userId:'me', status:'emise'}, {reload: true});
              } else {
                console.info('list');
                $state.go('.', {}, {reload: true});
              }
           // });
          };

          this.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        }
      });
    };

    this.download  = function(request) {
      request.isDownloaded = 'true';
      RequestResource.update(request).$promise.then(result => {
        $window.open('api/requests/' + result.shortId + '/pdf/agent?access_token=' + this.token, '_self');
      });
    };

  });

