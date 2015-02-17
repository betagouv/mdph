'use strict';

angular.module('impactApp')
  .controller('AidantCtrl', function ($scope) {

    $scope.title = 'Cette partie s\'adresse  à(aux) l\'aidant(s) de la personne en situation de handicap';

    if (angular.isUndefined($scope.formAnswers.aidant)) {
      $scope.formAnswers.aidant = {};
    }

    $scope.subsections = [
      {
        sref: 'departement.questionnaire.aidant.situation.lien',
        include: 'departement.questionnaire.aidant.situation.**',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        showAfter: true
      },
      {
        sref: 'departement.questionnaire.aidant.vos_attentes.type_attente',
        include: 'departement.questionnaire.aidant.vos_attentes.**',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
        showBefore: true
      }
    ];

    $scope.colClass = 'col-md-6';

    $scope.sectionModel = $scope.formAnswers.aidant;
    $scope.section = { id: 'aidant' };
  });
