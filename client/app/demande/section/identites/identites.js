'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.identites';
    $stateProvider
      .state(index + '.nouvelle_identite', {
        url: '/nouvelle_identite/:type',
        template: '<identity-form type="type" section="section"/>',
        resolve: {
          type: function($stateParams) {
            return $stateParams.type;
          },
          identite: function(request, type){
            return request.formAnswers.identites[type];
          }
        },
        controller: function($scope, type, identite){
          $scope.identite = identite;
          $scope.type = type;
        }
      });
  });
