'use strict';

angular.module('impactApp')
  .controller('TravailCtrl', function ($scope, FormService) {

    $scope.title = FormService.estRepresentant($scope.formAnswers) ? 'Sa vie au travail' : 'Votre vie au travail';

    $scope.subsections = [
      {
        sref: 'departement.questionnaire.projet_de_vie.travail.situation_professionnelle.condition',
        include: 'departement.questionnaire.projet_de_vie.travail.situation_professionnelle.**',
        label: 'Votre situation professionnelle',
        labelRep: 'Sa situation professionnelle',
        showAfter: true
      },
      {
        sref: 'departement.questionnaire.projet_de_vie.travail.projet_professionnel.description',
        include: 'departement.questionnaire.projet_de_vie.travail.projet_professionnel.**',
        label: 'Votre projet professionnel',
        labelRep: 'Ses projet professionnel',
        showBefore: true
      }
    ];
    $scope.colClass = 'col-md-6';

    if (angular.isUndefined($scope.formAnswers.travail)) {
      $scope.formAnswers.travail = {};
    }

    $scope.sectionModel = $scope.formAnswers.travail;
    $scope.section = { id: 'travail' };
  });
