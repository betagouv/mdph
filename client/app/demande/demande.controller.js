'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, $state, $window, $cookieStore, $modal, sections, Auth, estAdulte, request) {
    $scope.request = request;
    $scope.formAnswers = request.formAnswers;
    $scope.token = $cookieStore.get('token');

    $scope.sectionsObligatoires = _.filter(sections, {section: 'obligatoire'});
    $scope.sectionsComplementaires = _.filter(sections, {section: 'complementaire'});
    $scope.sectionsRenouvellements = _.filter(sections, {section: 'renouvellement'});
    $scope.sectionsDocuments = _.filter(sections, {section: 'documents'});


    var login = function (next) {
      $modal.open({
        templateUrl: 'components/modal/login.html',
        backdrop: true,
        windowClass: 'right fade',
        controller: 'ModalLoginCtrl'
      }).result.then(function() {
        // Ok - logged in
        next();
      }, function() {
        // Cancel
        $state.go('departement.demande');
      });
    };

    $scope.estAdulte = function() {
      if (request.formAnswers.identites && request.formAnswers.identites.beneficiaire) {
        return estAdulte(request.formAnswers.identites.beneficiaire.dateNaissance);
      } else {
        return true;
      }
    };

    $scope.getCompletion = function(section) {
      if (typeof request.formAnswers[section] === 'undefined') {
        return 0;
      } else if (request.formAnswers[section].__completion === true) {
        return 100;
      } else {
        return 50;
      }
    };

    var afterSave = function() {
      $window.alert('Votre demande à été sauvegardée');
      $state.go('departement.demande', {shortId: request.shortId});
    };

    var onError = function(err) {
      $window.alert(err.data.message);
    };

    var saveRequestAndAlert = function(next) {
      if (request._id) {
        request.$update(next, onError);
      } else {
        request.$save(next, onError);
      }
    };

    $scope.sauvegarder = function() {
      if (Auth.isLoggedIn()) {
        saveRequestAndAlert(afterSave);
      } else {
        login(function() {
          saveRequestAndAlert(afterSave);
        });
      }
    };

    $scope.envoyer = function() {
      var incompleteSections = [];
      $scope.sectionsObligatoires.forEach(function(section) {
        if (!request.formAnswers[section.id] || !request.formAnswers[section.id].__completion) {
          incompleteSections.push(section);
        }
      });

      // Todo verifier qu'il y a au moins un fichier dans le doc carteIdentite et certificatMedical (ou qu'il a ete transmis)

      if (incompleteSections.length > 0) {
        var str= 'Votre demande ne peut être envoyé car il n\'est pas complet.\nVeuillez renseigner les sections:\n';
        incompleteSections.forEach(function(section) {
          str += '\t -' + section.label + '\n';
        });

        $window.alert(str);
      } else {
        request.status = 'emise';
        request.html = 'Merci d\'avoir passé votre demande sur le service en ligne de la MDPH du ' + request.mdph;
        request.$update(function () {
          $window.alert('Votre demande à été sauvegardée');
        }, onError);
      }
    };
  });
