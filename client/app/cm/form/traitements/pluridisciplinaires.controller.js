'use strict';

angular.module('impactApp')
  .controller('CmPluridisciplinaireCtrl', function ($scope) {
    $scope.section = 'pluridisciplinaire';
    $scope.id = 'traitement_pluridisciplinaire_';
    $scope.inputLabel = 'Modalité de suivi';
    
    $scope.options = [
      {
        id: 'camsp',
        label: 'CAMSP',
        labelDetail: 'Centre Médico-Social Précoce',
        inputId: 'camspFreq'
      },
      {
        id: 'cmpp',
        label: 'CMPP',
        labelDetail: 'Centre Médico Psycho-Psychologique',
        inputId: 'cmppFreq'
      },
      {
        id: 'cmp',
        label: 'CMP',
        labelDetail: 'Centre Médico Psychologique',
        inputId: 'cmpFreq'
      },
      {
        id: 'cattp',
        label: 'CATTP',
        labelDetail: 'Centre d\'Accueil Thérapeutique à Temps Partiel',
        inputId: 'cattpFreq'
      },
      {
        id: 'hopital',
        label: 'Hôpital de jour',
        inputId: 'hopitalFreq'
      },
      {
        id: 'esms',
        label: 'ESMS',
        labelDetail: 'Etablissement et Service Médico-Social',
        inputId: 'esmsFreq'
      },
      {
        id: 'sessad',
        label: 'SESSAD',
        labelDetail: 'Service d\'Education Spécialisé et de Soins A Domicile',
        inputId: 'sessadFreq'
      },
      {
        id: 'autre',
        label: 'Autre',
        inputId: 'autreFreq'
      }
    ];
  });
