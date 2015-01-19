'use strict';

angular.module('impactApp')
  .controller('DetailDemandeCtrl', function ($scope, $http, $state, $modal, request, DroitService, prestations, requestSteps) {
    $scope.request = request;
    $scope.allFiles = requestSteps;

    if($scope.request.formAnswers){
      $scope.prestations = DroitService.compute($scope.request.formAnswers, prestations);
    }

    $scope.getStep = function(name) {
      return _.find($scope.request.steps, {'name': name});
    };

    $scope.addRequestedFile = function(file) {
      var step = $scope.getStep('complementaire');
      if (!step.files) {
        step.files = [];
      }
      step.files.push({name: file, state: 'demande'});
    };

    $scope.save = function() {
      var step = $scope.getStep('complementaire');
      step.state = 'en_cours';
      $scope.request.$update();
    };

    $scope.remove = function(files, index) {
      files.splice(index, 1);
    };

    $scope.goNext = function() {
      $state.go('dashboard.repartition_demandes.detail.evaluation', {shortId: $scope.request.shortId});
    };

    $scope.assignDocument = function (file){
      $modal.open({
        templateUrl: 'app/dashboard/repartition_demandes/detail/assignDocumentModal.html',
        controller: function($scope, $modalInstance, Partenaire) {
          $scope.file = file;
          $scope.partenaires = Partenaire.query();
          $scope.selected = '';
          $scope.ok = function() {
            $modalInstance.close();
          };
        }
      });
    };
  });
