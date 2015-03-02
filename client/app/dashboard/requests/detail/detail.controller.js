'use strict';

angular.module('impactApp')
  .filter('age', function() {
     function calculAge(dateNaiss) {
         var ageDiff = Date.now() - Date.parse(dateNaiss);
         var ageDate = new Date(ageDiff);
         return Math.abs(ageDate.getUTCFullYear() - 1970);
     }
     return function(dateNaiss) {
           return calculAge(dateNaiss);
     };
  })
  .controller('RequestDetailCtrl', function ($scope, $http, $window, $state, $modal, $filter, request, sections, GevaService, DroitService, Partenaire, NotificationService, RecapitulatifService, vieQuotidienne) {
    $scope.request = request;
    $scope.sections = sections;
    $scope.computeCompletion = GevaService.computeCompletion;

    var familleAnswers = _.indexBy(vieQuotidienne[0].answers, 'value');
    $scope.situationFamiliale = familleAnswers[request.formAnswers.vie_quotidienne.famille];

    var logementAnswers = _.indexBy(vieQuotidienne[1].answers, 'value');
    $scope.situationLogement = logementAnswers[request.formAnswers.vie_quotidienne.logement];

    if($scope.situationFamiliale.labelRecap){
      $scope.situationFamiliale = $scope.situationFamiliale.labelRecap;
    } else {
      $scope.situationFamiliale = $scope.situationFamiliale.label;
    }

    if($scope.situationLogement.labelRecap){
      $scope.situationLogement = $scope.situationLogement.labelRecap;
    } else {
      $scope.situationLogement = $scope.situationLogement.label;
    }

    if(request.renouvellement){
      $scope.renouvellement = 'Renouvellement';
    } else {
      $scope.renouvellement = 'Première demande';
    }

    DroitService.compute(request.formAnswers).success(function(result) {
      $scope.prestations = result;
    });

    $scope.back = function() {
      $window.history.back();
    };

    $scope.telecharger = RecapitulatifService.telechargerPdf;

    $scope.goNext = function() {
      $state.go('dashboard.repartition_demandes.detail.evaluation', {shortId: $scope.request.shortId});
    };

    // $scope.addRequestedFile = function(file) {
    //   var step = $scope.getStep('complementaire');
    //   if (!step.files) {
    //     step.files = [];
    //   }
    //   step.files.push({name: file, state: 'demande'});
    // };

    // $scope.save = function() {
    //   var step = $scope.getStep('complementaire');
    //   step.state = 'en_cours';
    //   $scope.request.$update();

    //   _.forEach(step.files, function(file){
    //     if (file.assignment){
    //       envoiAssignation(file);
    //     }
    //   });
    //   NotificationService.createNotification($scope.request, 'espace_perso.liste_demandes.demande.complementaire', 'Des documents vous ont été demandés par votre MDPH.');
    // };

    // $scope.remove = function(files, index) {
    //   files.splice(index, 1);
    // };

    // $scope.assignDocument = function (file){
    //   var modalInstance = $modal.open({
    //     templateUrl: 'app/dashboard/requests/detail/assignDocumentModal.html',
    //     size: 'lg',
    //     controller: function($scope, $modalInstance, Partenaire) {
    //       $scope.file = file;
    //       $scope.partenaires = Partenaire.query();
    //       $scope.chosenPartenaire = {};
    //       $scope.newPartenaire = {};
    //       $scope.radioModel ='';

    //       $scope.ok = function() {
    //         var answers = {
    //           label: $scope.radioModel,
    //           chosenPartenaire: $scope.chosenPartenaire,
    //           newPartenaire: $scope.newPartenaire
    //         };
    //         $modalInstance.close(answers);
    //       };

    //       $scope.checkIfDisabled = function() {
    //         return !$scope.assignmentForm.$valid ||
    //           ($scope.radioModel !== 'Demandeur' && !$scope.chosenPartenaire.email && !$scope.newPartenaire.email) ||
    //           ($scope.radioModel === 'Nouveau partenaire' && !$scope.newPartenaire.email) ||
    //           ($scope.radioModel === 'Partenaire connu' && !$scope.chosenPartenaire.email) ||
    //           ($scope.chosenPartenaire.email === '' && !$scope.newPartenaire.email);
    //       };

    //       $scope.cancel = function () {
    //         $modalInstance.dismiss();
    //       };
    //     }
    //   });

    //   modalInstance.result.then(function (answers) {
    //     if(answers.label !== 'Demandeur' && answers.chosenPartenaire.email){
    //       file.assignment = answers.chosenPartenaire.email;
    //     }
    //     else {
    //       if(answers.label !== 'Demandeur' && answers.newPartenaire.email){
    //         var newPartenaire = new Partenaire(answers.newPartenaire);
    //         newPartenaire.$save();
    //         file.assignment = newPartenaire.email;
    //       }
    //     }
    //     file.assignmentLabel = answers.label;
    //   });
    // };

    // var envoiAssignation = function(file){
    //   $http.post('api/send-mail/assignment', {
    //     assignment: file.assignment,
    //     html: '<h1>Ajout de pièces</h1><p>Bonjour, la MDPH vous demande de fournir une pièce pour compléter la demande de ' + $scope.request.user.name + '. Il s\'agit de '+ angular.lowercase($filter('documentFilter')(file.name)) +' pour la demande ' + $scope.request.shortId + '.</p>',
    //     subject: 'Demande d\'ajout de pièces'
    //   });
    // };

  });
