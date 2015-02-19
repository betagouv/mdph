'use strict';

angular.module('impactApp')
  .controller('QuestionnaireCtrl', function ($rootScope, $scope, $state, $timeout, $window, RequestResource, SectionConstants, Auth, isAdult, RecapitulatifService, request) {
    $scope.currentRequest = request;
    $scope.formAnswers = $scope.currentRequest.formAnswers;

    $scope.sectionsOptionnelles = _.filter(SectionConstants, {optional: true});
    $scope.sectionsObligatoires = _.filter(SectionConstants, {optional: false});

    $scope.shouldShow = function(section) {
      if (section.id !== 'autorite') {
        return true;
      }

      if ($scope.formAnswers.identite && moment().diff($scope.formAnswers.identite.birthDate, 'years') < 18) {
        return true;
      }

      return false;
    };

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
        $state.go('departement.questionnaire', {id: $scope.currentRequest.shortId});
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

    $scope.formatForCerfa = function() {
      return flatten($scope.formAnswers);
    };

    var flatten = (function (isArray, wrapped) {
        function reduce(path, accumulator, table) {
            if (isArray(table)) {
                var length = table.length;

                if (length) {
                    var index = 0;

                    while (index < length) {
                        var property = path, item = table[index++];
                        if (wrapped(item) !== item) {
                          accumulator[property] = item;
                        }
                        else {
                          reduce(property, accumulator, item);
                        }
                    }
                } else {
                  accumulator[path] = table;
                }
            } else {
                var empty = true;

                if (path) {
                    for (var property in table) {
                        var item = table[property], property = path + '.' + property, empty = false;
                        if (wrapped(item) !== item) accumulator[property] = item;
                        else reduce(property, accumulator, item);
                    }
                } else {
                    for (var property in table) {
                        var item = table[property], empty = false;
                        if (wrapped(item) !== item) accumulator[property] = item;
                        else reduce(property, accumulator, item);
                    }
                }

                if (empty) accumulator[path] = table;
            }

            return accumulator;
        }

        return function (table) {
            return reduce('', {}, table);
        };
    }(Array.isArray, Object));

    $scope.saveSection = function(sectionModel) {
      sectionModel.__completion = true;
      if ($scope.currentRequest._id) {
        $scope.currentRequest.$update(onSuccess, onError);
      } else {
        $state.go('departement.questionnaire');
      }
    };

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
        if (!$scope.shouldShow(section)) {
          return;
        }

        if (!$scope.currentRequest.formAnswers[section.id] || !$scope.currentRequest.formAnswers[section.id].__completion) {
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

        $scope.currentRequest.html = 'Merci d\'avoir passé votre demande sur le service en ligne de la MDPH du ' + $scope.mdph.zipcode;

        if (Auth.isLoggedIn()) {
          saveRequestAndAlert();
        } else {
          $state.go('departement.questionnaire.modal.login');
        }
      }
    };
  });
