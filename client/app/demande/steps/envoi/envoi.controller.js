'use strict';

angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, allSteps, step, user, request, documentTypes, $modal) {
    $scope.request = request;
    $scope.step = step;
    $scope.user = user;
    $scope.showError = false;

    var stepObligatoire = $scope.stepObligatoire = _.find(allSteps, {id: 'obligatoire'});
    $scope.stepDocuments = _.find(allSteps, {id: 'documents'});

    $scope.nbSections = 0;
    stepObligatoire.sections.forEach(function(section) {
      if (request.formAnswers[section] && request.formAnswers[section].__completion) {
        $scope.nbSections += 1;
      }
    });

    $scope.totalSections = stepObligatoire.sections.length;

    var documentsObligatoires = $scope.documentsObligatoires = _.chain(documentTypes)
      .filter({mandatory: true})
      .pluck('id')
      .value();

    $scope.nbDocuments = 0;
    if (request.documents) {
      documentsObligatoires.forEach(function(document) {
        var documentsOfType = _.find(request.documents, {type: document});
        if (typeof documentsOfType !== 'undefined') {
          $scope.nbDocuments += 1;
        }
      });
    }

    $scope.totalDocuments = documentsObligatoires.length;

    $scope.statusSections = $scope.nbSections === $scope.totalSections ? true : false;
    $scope.statusDocuments = $scope.nbDocuments === $scope.totalDocuments ? true : false;

    $scope.envoyer = function() {
      var isReadyToSend = $scope.statusSections && $scope.statusDocuments && !$scope.user.unconfirmed;
      if (!isReadyToSend) {
        $scope.showError = true;
      } else {
        $scope.showError = false;
        request.status = 'emise';
        request.html = 'Merci d\'avoir passé votre demande sur le service en ligne de la MDPH ' + request.mdph;
        request.$update({isSendingRequest: true}, function() {
          $modal.open({
            templateUrl: 'app/demande/steps/envoi/modal_envoi_ok.html',
            backdrop: true,
            windowClass: 'right fade',
            controller: function($modalInstance, $scope) {
              $scope.ok = function() {
                $modalInstance.close();
              };
            }
          });
        });
      }
    };
  })
  .filter('stepStatus', function() {
    return function(input) {
      if (input) {
        return 'Section complète';
      } else {
        return 'Section incomplète';
      }
    };
  });
