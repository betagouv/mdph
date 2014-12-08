'use strict';

angular.module('impactApp')
  .controller('AidantCtrl', function ($scope) {

    $scope.title = 'Cette partie s\'adresse  à(aux) l\'aidant(s) de la personne en situation de handicap';
    $scope.hideSubsections = true;

    if (angular.isUndefined($scope.formAnswers.aidant)) {
      $scope.formAnswers.aidant = {};
    }

    $scope.subsections = [
      {
        sref: 'departement.questionnaire.projet_de_vie.aidant.situation.lien',
        include: 'departement.questionnaire.projet_de_vie.aidant.situation.**',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        showAfter: true
      },
      {
        sref: 'departement.questionnaire.projet_de_vie.aidant.vos_attentes.type_attente',
        include: 'departement.questionnaire.projet_de_vie.aidant.vos_attentes.**',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
        showBefore: true
      }
    ];

    $scope.colClass = 'col-md-6';

    $scope.sectionModel = $scope.formAnswers.aidant;
  });
