'use strict';

angular.module('impactApp')
  .controller('IdentitesCtrl', function($scope, request, section, sectionModel, estMineur, saveSection) {
    $scope.request = request;
    $scope.section = section;
    $scope.sectionModel = sectionModel;

    function showError(msg) {
      $scope.error = {
        show: true,
        message: msg
      };
    }

    function hideError() {
      $scope.error = {
        show: false,
        message: ''
      };
    }
    hideError();

    function exists(identite) {
      return typeof identite !== 'undefined' &&  typeof identite.nom !== 'undefined';
    }

    $scope.$on('hideError', hideError);

    $scope.checkIdentities = function(){
      var formIdentites = request.formAnswers.identites;
      if (!formIdentites.beneficiaire || !formIdentites.beneficiaire.nom){
        showError('Veuillez renseigner un bénéficiaire.');
      }
      else {
        if (estMineur(formIdentites.beneficiaire.dateNaissance)){
          var autorite = formIdentites.autorite;
          if (!autorite) {
            showError('Le bénéficiaire est mineur, veuillez renseigner au moins une autorité parentale ou une délégation d\'autorité parentale.');
          }
          else if (!(exists(autorite.parent1) || exists(autorite.parent2) || exists(autorite.autre))){
            showError('Le bénéficiaire est mineur, veuillez renseigner au moins une autorité parentale ou une délégation d\'autorité parentale.');
          }
          else {
            hideError();
          }
        }
      }

      if (!$scope.error.show) {
        saveSection();
      }
    };
  });
