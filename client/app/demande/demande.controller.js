'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, $state, $window, $modal, mdph, documentTypes, sections, Auth, request, RequestService) {
    $scope.request = request;
    $scope.mdph = mdph;
    $scope.formAnswers = request.formAnswers;
    $scope.getCompletion = RequestService.getCompletion;
    $scope.estAdulte = function() {
      return RequestService.estAdulte(request);
    };

    var documentsObligatoires = _.filter(documentTypes, {type: 'obligatoire'});

    function login(afterLogin, returnToSref) {
      $modal.open({
        templateUrl: 'components/login/login.html',
        backdrop: true,
        windowClass: 'right fade',
        controller: 'ModalLoginCtrl'
      }).result.then(function(nextStep) {
        // Ok - logged in
        afterLogin(nextStep);
      }, function() {
        // Cancel
        $state.go(returnToSref);
      });
    }

    function alertAfterSave(returnToSref) {
      $window.alert('Votre demande à été sauvegardée');
      $state.go(returnToSref, {shortId: request.shortId});
    }

    function onError(err) {
      $window.alert(err.data.message);
    }

    function saveRequestAndAlert(afterSave) {
      if (request._id) {
        request.$update(afterSave, onError);
      } else {
        request.$save(afterSave, onError);
      }
    }

    $scope.sauvegarder = function(returnToSref) {
      if (Auth.isLoggedIn()) {
        saveRequestAndAlert(function () {
          alertAfterSave(returnToSref)
        });
      } else {
        login(function() {
          saveRequestAndAlert(function () {
            alertAfterSave(returnToSref)
          });
        }, returnToSref);
      }
    };

  });
