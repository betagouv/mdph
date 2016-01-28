'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('espace_perso.mes_profils.profil.demande.recapitulatif', {
    url: '/recapitulatif',
    authenticate: true,
    data: {
      title: 'Récapitulatif de la demande'
    },

    templateUrl: 'app/espace_perso/mes_profils/profil/demande/recapitulatif/recapitulatif.html',

    controller: function($scope, $cookies, request) {
      $scope.token = $cookies.get('token');
      $scope.pdfName = (request.formAnswers.identites.beneficiaire.nom).toLowerCase() +
                      '_' + (request.formAnswers.identites.beneficiaire.prenom).toLowerCase() +
                      '_' + request.shortId + '.pdf';
    }
  });
});
