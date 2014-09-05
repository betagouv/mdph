'use strict';

angular.module('impactApp')
  .controller('SocialCtrl', function($scope, $state) {

    if ($scope.estRepresentant()) {
      $scope.subtitle ='Quels sont ses besoins d\'aide dans ses relations sociales et familiales ?';
    } else {
      $scope.subtitle ='Quels sont vos besoins d\'aide dans vos relations sociales et familiales ?';
    }

    if (angular.isUndefined($scope.subSectionModel.social)) {
      $scope.subSectionModel.social = {
        'besoins': {
        },
        'detail': ''
      };
    }

    $scope.model = $scope.subSectionModel.social;
    $scope.question = {
      model: 'besoins',
      'answers': [
        { label: 'Pour communiquer (s\'exprimer, se faire comprendre)', model: 'communication' },
        { label: 'Pour avoir des activités culturelles, sportives et de loisirs', model: 'loisirs' },
        {
          label: 'Pour les relations les autres',
          model: 'proches'
        },
        {
          label: 'Pour vous occuper de votre famille',
          labelRep: 'Pour s\'occuper de sa famille',
          model: 'famille', 'onlyAdult': true
        },
        {
          label: 'Pour vous accompagner dans votre vie citoyenne (ex: aller voter, vie associative ...)',
          labelRep: 'Pour se faire accompagner dans sa vie citoyenne (ex: aller voter, vie associative ...)',
          model: 'citoyen', 'onlyAdult': true
        },
        {
          label: 'Pour assurer votre sécurité',
          labelRep: 'Pour assurer sa sécurité',
          model: 'securite'
        },
        { label: 'Autre besoin', model: 'autre', 'detail': true }
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.lieu_de_vie');
    };
  });
