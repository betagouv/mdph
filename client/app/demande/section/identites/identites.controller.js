'use strict';

angular.module('impactApp')
  .controller('IdentitesCtrl', function($scope, request, section, sectionModel, estMineur, saveSection) {
    $scope.request = request;
    $scope.section = section;
    $scope.estMineur = estMineur;
    $scope.sectionModel = sectionModel;
    $scope.error = {
      show: false,
      message: ''
    };

    function exists(identite) {
      return typeof identite !== 'undefined' &&  typeof identite.nom !== 'undefined';
    }

    $scope.checkIdentities = function(){
      var formIdentites = request.formAnswers.identites;
      if (!formIdentites.beneficiaire || !formIdentites.beneficiaire.nom){
        $scope.error.show = true;
        $scope.error.message = 'Veuillez renseigner un bénéficiaire.';
      }
      else {
        if (estMineur(formIdentites.beneficiaire.dateNaissance)){
          var autorite = formIdentites.autorite;
          if (!autorite || !(exists(autorite.parent1) || !exists(autorite.parent2) || !exists(autorite.autre))){
            $scope.error.show = true;
            $scope.error.message = 'Le bénéficiaire est mineur, veuillez renseigner au moins une autorité parentale ou une délégation d\'autorité parentale.';
          }
        }
      }

      if (!$scope.error.show) {
        saveSection();
      }
    };
  });
