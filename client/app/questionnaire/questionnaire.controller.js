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

    var onSuccess = function() {
      $timeout(function() {
        $window.alert('Votre questionnaire à été sauvegardé');
      }, 100);
    };

    var saveRequestAndAlert = function() {
      if ($scope.currentRequest._id) {
        $scope.currentRequest.$update(onSuccess, onError);
      } else {
        $scope.currentRequest.$save(onSuccess, onError);
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

        saveRequestAndAlert();
      } else {
        $state.go('departement.questionnaire.modal.login');
      }
    };
  });
