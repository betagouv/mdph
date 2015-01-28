'use strict';

angular.module('impactApp')
  .controller('DetailDemandeCtrl', function ($scope, $http, $state, $modal, $filter, request, DroitService, prestations, requestSteps, Partenaire, Notification) {
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

      _.forEach(step.files, function(file){
        if (file.assignment){
          envoiAssignation(file);
        }
      });

      var notification = new Notification();
      notification.userId = $scope.request.user._id;
      notification.requestId = $scope.request.shortId;
      notification.state = 'liste_demandes.demande.complementaire';
      notification.message = 'Des documents vous ont été demandés par votre MDPH.';
      notification.$save();
    };

    $scope.remove = function(files, index) {
      files.splice(index, 1);
    };

    $scope.goNext = function() {
      $state.go('dashboard.repartition_demandes.detail.evaluation', {shortId: $scope.request.shortId});
    };

    $scope.assignDocument = function (file){
      var modalInstance = $modal.open({
        templateUrl: 'app/dashboard/repartition_demandes/detail/assignDocumentModal.html',
        size: 'lg',
        controller: function($scope, $modalInstance, Partenaire) {
          $scope.file = file;
          $scope.partenaires = Partenaire.query();
          $scope.chosenPartenaire = {};
          $scope.newPartenaire = {};
          $scope.radioModel ='';

          $scope.ok = function() {
            var answers = {
              label: $scope.radioModel,
              chosenPartenaire: $scope.chosenPartenaire,
              newPartenaire: $scope.newPartenaire
            };
            $modalInstance.close(answers);
          };

          $scope.checkIfDisabled = function() {
            return !$scope.assignmentForm.$valid ||
              ($scope.radioModel !== 'Demandeur' && !$scope.chosenPartenaire.email && !$scope.newPartenaire.email) ||
              ($scope.radioModel === 'Nouveau partenaire' && !$scope.newPartenaire.email) ||
              ($scope.radioModel === 'Partenaire connu' && !$scope.chosenPartenaire.email) ||
              ($scope.chosenPartenaire.email === '' && !$scope.newPartenaire.email);
          };

          $scope.cancel = function () {
            $modalInstance.dismiss();
          };
        }
      });

      modalInstance.result.then(function (answers) {
        if(answers.label !== 'Demandeur' && answers.chosenPartenaire.email){
          file.assignment = answers.chosenPartenaire.email;
        }
        else {
          if(answers.label !== 'Demandeur' && answers.newPartenaire.email){
            var newPartenaire = new Partenaire(answers.newPartenaire);
            newPartenaire.$save();
            file.assignment = newPartenaire.email;
          }
        }
        file.assignmentLabel = answers.label;
      });
    };

    var envoiAssignation = function(file){
      $http.post('api/send-mail/assignment', {
        assignment: file.assignment,
        html: '<h1>Ajout de pièces</h1><p>Bonjour, la MDPH vous demande de fournir une pièce pour compléter la demande de ' + $scope.request.user.name + '. Il s\'agit de '+ angular.lowercase($filter('documentFilter')(file.name)) +' pour la demande ' + $scope.request.shortId + '.</p>',
        subject: 'Demande d\'ajout de pièces'
      });
    };

  });
