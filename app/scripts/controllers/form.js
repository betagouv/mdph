'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('FormCtrl', function ($rootScope, $scope, $state, $stateParams, $sessionStorage) {

    // TODO remplacer toute cette partie par ui-serf-active quand
    // ca marchera pour les nested states
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $scope.$storage = $sessionStorage.$default({
      sectionContexte: {
        id: 0,
        sref: 'form.contexte.representant',
        filter: 'form.contexte.**',
        glyphicon: 'glyphicon-log-in',
        label: 'Pour commencer',
        isOptionnal: false,
        isEnabled: true
      },
      sectionVieQuotidienne: {
        id: 1,
        sref: 'form.vie_quotidienne.vie_famille',
        filter: 'form.vie_quotidienne.**',
        span: 'A',
        label: 'Vie quotidienne',
        isOptionnal: false
      },
      sectionScolarite: {
        id: 2,
        sref: 'form.votre_scolarite.condition',
        filter: 'form.votre_scolarite.**',
        span: 'B',
        label: 'Vie scolaire ou étudiante',
        isOptionnal: true
      },
      sectionTravail: {
        id: 3,
        sref: 'form.votre_travail.situation_professionnelle.condition',
        filter: 'form.votre_travail.**',
        span: 'C',
        label: 'Vie au travail',
        isOptionnal: true
      },
      sectionAidant: {
        id: 4,
        sref: 'form.votre_aidant.lien',
        filter: 'form.votre_aidant.**',
        span: 'D',
        label: 'Aidant familial',
        isOptionnal: true
      },
      sectionEnvoi: {
        id: 5,
        sref: 'form.envoi',
        filter: 'form.envoi.**',
        glyphicon: 'glyphicon-paperclip',
        label: 'Pièces justificatives',
        isOptionnal: false
      }
    });

    $scope.sections = [
      $scope.$storage.sectionContexte,
      $scope.$storage.sectionVieQuotidienne,
      $scope.$storage.sectionScolarite,
      $scope.$storage.sectionTravail,
      $scope.$storage.sectionAidant,
      $scope.$storage.sectionEnvoi
    ];

    $scope.estRepresentant = function() {
      if (angular.isUndefined($scope.$storage.contexte) ||
          angular.isUndefined($scope.$storage.contexte.answers) ||
          angular.isUndefined($scope.$storage.contexte.answers.estRepresentant)) {
        return false;
      }
      return $scope.$storage.contexte.answers.estRepresentant.value;
    };

    $scope.getLabel = function(answer) {
      if ($scope.estRepresentant() && answer.labelRep) {
        return answer.labelRep;
      }
      return answer.label;
    };

    $scope.getName = function() {
      if (angular.isUndefined($scope.$storage.contexte) ||
          angular.isUndefined($scope.$storage.contexte.answers) ||
          angular.isUndefined($scope.$storage.contexte.answers.estRepresentant)) {
        return '';
      }
      return $scope.$storage.contexte.answers.estRepresentant.detail;
    };

    $scope.goToNextSection = function(currentSection) {
      var probableNext = $scope.sections[currentSection.id + 1];
      if (probableNext.isOptionnal && !probableNext.isEnabled) {
        $scope.goToNextSection(probableNext.id);
      } else {
        $state.go(probableNext.sref);
      }
    };
  });
