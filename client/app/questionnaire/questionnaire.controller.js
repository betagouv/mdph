'use strict';

angular.module('impactApp')
  .controller('QuestionnaireCtrl', function ($rootScope, $scope, $state, $timeout, $window, RequestResource, SectionConstants, Auth, isAdult, request) {
    $scope.currentRequest = request;
    $scope.formAnswers = $scope.currentRequest.formAnswers;

    $scope.sectionsOptionnelles = _.filter(SectionConstants, {optional: true});
    $scope.sectionsObligatoires = _.filter(SectionConstants, {optional: false});

    $scope.isAdult = function() {
      return isAdult($scope.formAnswers.contexte);
    };

    $scope.getCompletion = function(section) {
      if (typeof $scope.formAnswers[section] === 'undefined') {
        return 0;
      } else if ($scope.formAnswers[section].__completion === true) {
        return 100;
      } else {
        return 50;
      }
    };

    var onError = function(err) {
      $window.alert(err.data.message);
    };

    var onSuccess = function(next) {
      $timeout(function() {
        $window.alert('Votre questionnaire à été sauvegardé');
        if (next) { next(); }
      }, 100);
    };

    var saveRequestAndAlert = function(next) {
      if ($scope.currentRequest._id) {
        $scope.currentRequest.$update(onSuccess(next), onError);
      } else {
        $scope.currentRequest.$save(onSuccess(next), onError);
      }
    };

    $scope.$on('logged-in-save-request', saveRequestAndAlert);

    $scope.sauvegarder = function() {
      if (Auth.isLoggedIn()) {
        saveRequestAndAlert();
      } else {
        $state.go('departement.questionnaire.modal.login');
      }
    };

    $scope.envoyer = function() {
      var isComplete = true;
      var incompleteSections = [];
      $scope.sectionsObligatoires.forEach(function(section) {
        if (!$scope.currentRequest.formAnswers[section] || !$scope.currentRequest.formAnswers[section].__completion) {
          isComplete = false;
          incompleteSections.push(section);
        }
      });

      if (!isComplete) {
        var str= 'Votre questionnaire ne peut être envoyé car il n\'est pas complet.\nVeuillez renseigner les sections:\n';
        incompleteSections.forEach(function(section) {
          str += '\t -' + section.label + '\n';
        });

        $window.alert(str);
      } else {
        if (Auth.isLoggedIn()) {
          $scope.currentRequest.steps = [
            {
              name: 'questionnaire',
              state: 'complet'
            },
            {
            name: 'obligatoire',
            state: 'en_cours',
            files: [
              { name: 'certificatMedical', state: 'demande' },
              { name: 'carteIdentite', state: 'demande' }
            ]
          }];

          saveRequestAndAlert(function() {
            $state.go('espace_perso.liste_demandes');
          });
        } else {
          $state.go('departement.questionnaire.modal.login');
        }
      }
    };
  });
