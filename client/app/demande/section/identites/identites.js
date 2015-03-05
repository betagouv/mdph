'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.identites';
    $stateProvider
      .state(index + '.modification_identite', {
        url: '/:type?parent',
        template: '<identity-form type="type" section="section" identite="identite"/>',
        resolve: {
          type: function($stateParams) {
            return $stateParams.type;
          },
          identite: function(request, type, $stateParams){
            var currentIdentites = request.formAnswers.identites;
            if(!currentIdentites[type]){
              currentIdentites[type] = {};
            }
            if(type==='autorite'){
              if($stateParams.parent){
                if(!currentIdentites[type][$stateParams.parent]){
                  currentIdentites[type][$stateParams.parent] = {};
                }
                return currentIdentites[type][$stateParams.parent];
              }
              else {
                return currentIdentites[type].parent1;
              }
            }
            return currentIdentites[type];
          }
        },
        controller: function($scope, type, identite){
          $scope.identite = identite;
          $scope.type = type;
        }
      });
  });
