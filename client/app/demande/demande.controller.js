'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, $state, $window, $cookieStore, $modal, documentTypes, sections, Auth, request, RequestService) {
    $scope.request = request;
    $scope.formAnswers = request.formAnswers;
    $scope.token = $cookieStore.get('token');
    $scope.getCompletion = RequestService.getCompletion;
    $scope.estAdulte = function() {
      return RequestService.estAdulte(request);
    };

    $scope.sectionsObligatoires = _.filter(sections, {group: 'obligatoire'});
    $scope.sectionsComplementaires = _.filter(sections, {group: 'complementaire'});
    $scope.sectionsComplements = _.filter(sections, {group: 'complements'});
    $scope.sectionsDocuments = _.filter(sections, {group: 'documents'});

    var documentsObligatoires = _.filter(documentTypes, {type: 'obligatoire'});

    function login(next) {
      $modal.open({
        templateUrl: 'components/modal/login.html',
        backdrop: true,
        windowClass: 'right fade',
        controller: 'ModalLoginCtrl'
      }).result.then(function() {
        // Ok - logged in
        next();
      }, function() {
        // Cancel
        $state.go('departement.demande');
      });
    }

    function afterSave() {
      $window.alert('Votre demande à été sauvegardée');
      $state.go('departement.demande', {shortId: request.shortId});
    }

    function onError(err) {
      $window.alert(err.data.message);
    }

    function saveRequestAndAlert(next) {
      if (request._id) {
        request.$update(next, onError);
      } else {
        request.$save(next, onError);
      }
    }


    $scope.sauvegarder = function() {
      if (Auth.isLoggedIn()) {
        saveRequestAndAlert(afterSave);
      } else {
        login(function() {
          saveRequestAndAlert(afterSave);
        });
      }
    };

    $scope.envoyer = function() {
      RequestService.isReadyToSend(request, $scope.sectionsObligatoires, documentsObligatoires, function(err) {
        if (err) {
          $window.alert(err);
        } else {
          request.status = 'emise';
          request.html = 'Merci d\'avoir passé votre demande sur le service en ligne de la MDPH du ' + request.mdph;
          request.$update({isSendingRequest: true}, function () {
            $window.alert('Votre demande à été sauvegardée');
          }, onError);
        }
      });
    };
  });
