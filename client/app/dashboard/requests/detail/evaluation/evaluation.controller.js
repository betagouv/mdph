'use strict';

angular.module('impactApp')
  .controller('RequestEvaluationCtrl', function ($scope, $modal, $cookieStore, sections, GevaService, prestations, request) {
    $scope.sections = sections;
    $scope.computeCompletion = GevaService.computeCompletion;
    $scope.request = request;
    $scope.token = $cookieStore.get('token');
    if (!request.synthese) {
      request.synthese = {
        geva: {}
      };
    }
    else if (!request.synthese.geva) {
      request.synthese.geva = {};
    }

    $scope.autoriserTelechargement = function () {
      return ! request.synthese.proposition ? true : false;
    };

    $scope.afficherSynthese = function () {
      $modal.open({
        templateUrl: 'app/dashboard/requests/detail/evaluation/synthese.html',
        controller: 'ModalSyntheseCtrl',
        size: 'lg',
        resolve: {
          prestations: function () {
            return prestations;
          },
          request : function () {
            return request;
          }
        }
      });
    };
  })
  .controller('ModalSyntheseCtrl', function ($scope, $modalInstance, prestations, request) {
    $scope.prestations = prestations;
    if (!request.synthese.proposition) {
      request.synthese.proposition = {};
    }
    $scope.proposition = request.synthese.proposition;
    if (!$scope.proposition.prestaDemande) {
      $scope.proposition.prestaDemande = [
        {
          label: '',
          motivation: ''
        }
      ];
    }

    if (!$scope.proposition.prestaAutre) {
      $scope.proposition.prestaAutre = [
        {
          label: '',
          motivation: ''
        }
      ];
    }

    if (!$scope.proposition.preconisations) {
      $scope.proposition.preconisations = '';
    }



    $scope.ajouterPrestaDemande = function(){
      $scope.proposition.prestaDemande.push({
        label: '',
        eligibilite: '',
        motivation: ''
      });
    };

    $scope.retirerPresta = function(type){
      var lastIndex = type.indexOf(_.last(type));
      type.splice(lastIndex, 1);
    };

    $scope.ajouterPrestaAutre = function(){
      $scope.proposition.prestaAutre.push({
        label: '',
        motivation: ''
      });
    };

    $scope.ok = function() {
      request.synthese.proposition = $scope.proposition;
      request.$update();
      $modalInstance.close();
    };
  });
