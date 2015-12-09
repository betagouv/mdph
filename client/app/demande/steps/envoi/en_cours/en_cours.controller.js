'use strict';

angular.module('impactApp')
  .controller('EnCoursCtrl', function($scope, user, request, RequestService, $modal, prestations, prestationsQuitus) {
    $scope.user = user;
    $scope.showError = false;
    $scope.types = _.groupBy(prestations, 'type');
    $scope.prestationsQuitus = prestationsQuitus;
    $scope.request = request;
    $scope.selected = {};

    if ($scope.request.prestations && $scope.request.prestations.length > 0) {
      $scope.request.prestations.forEach(function(prestation) {
        $scope.selected[prestation] = true;
      });
    }

    $scope.getObligatoiresCompletion = function() {
      return RequestService.getStepCompletion({id: 'obligatoire'}, request);
    };

    $scope.getDocumentsCompletion = function() {
      return RequestService.getStepCompletion({id: 'documents'}, request);
    };

    $scope.sync = function() {
      request.prestations = _
        .chain($scope.selected)
        .keys()
        .reduce(function(total, current) {
          if ($scope.selected[current]) {
            total.push(current);
          }

          return total;
        }, [])
        .value();
    };

    $scope.select = function(prestation) {
      $scope.selected[prestation.id] = !$scope.selected[prestation.id];
      $scope.sync();
    };

    $scope.isReadyToSend = function() {
      return RequestService.getRequestCompletion(request) && !$scope.user.unconfirmed;
    };

    $scope.envoyer = function() {
      if (!$scope.isReadyToSend()) {
        $scope.showError = true;
      } else {
        $scope.showError = false;
        request.status = 'emise';

        request.$update({isSendingRequest: true});

        // TODO: Ecrire un nouveau questionnaire de satisfaction
        // request.$update({isSendingRequest: true}, function() {
        //   $modal.open({
        //     templateUrl: 'app/demande/steps/envoi/modal_envoi_ok.html',
        //     backdrop: true,
        //     windowClass: 'right fade',
        //     controller: function($modalInstance, $scope) {
        //       $scope.ok = function() {
        //         $modalInstance.close();
        //       };
        //     }
        //   });
        // });
      }
    };
  });
