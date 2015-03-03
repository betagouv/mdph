'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, $state, $timeout, $window, SectionConstants, RecapitulatifService, Auth, isAdult, request) {
    $scope.request = request;
    $scope.formAnswers = request.formAnswers;
    $scope.telecharger = RecapitulatifService.telechargerPdf;

    $scope.sectionsObligatoires = _.filter(SectionConstants, {section: 'obligatoire'});
    $scope.sectionsComplementaires = _.filter(SectionConstants, {section: 'complementaire'});
    $scope.sectionsBonus = _.filter(SectionConstants, {section: 'autour_de_votre_demande'});
    $scope.sectionsDocuments = _.filter(SectionConstants, {section: 'documents'});

    $scope.getLastSref = function(section) {
      if (!request.formAnswers[section.id]) {
        return section.sref;
      } else {
        return request.formAnswers[section.id].__lastSref || section.sref;
      }
    };

    $scope.shouldShow = function(section) {
      switch (section.id) {
        case 'autorite':
          var estMineur;
          try {
            estMineur = moment().diff(request.formAnswers.identite.birthDate, 'years') < 18;
          } catch (e) {
            estMineur = false;
          }
          return estMineur;
        case 'documents':
          return request.status === 'emise';
      }

      return true;
    };

    $scope.isAdult = function() {
      return isAdult(request.formAnswers.contexte);
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

    var onError = function(err) {
      $window.alert(err.data.message);
    };

    var onSuccess = function() {
      $timeout(function() {
        $window.alert('Votre demande à été sauvegardée');
        $state.go('departement.demande', {shortId: request.shortId});
      }, 100);
    };

    var saveRequestAndAlert = function() {
      if (request._id) {
        request.$update(onSuccess, onError);
      } else {
        request.$save(onSuccess, onError);
      }
    };

    $scope.$on('logged-in-save-request', saveRequestAndAlert);

    $scope.sauvegarder = function() {
      if (Auth.isLoggedIn()) {
        saveRequestAndAlert();
      } else {
        $state.go('departement.demande.modal.login');
      }
    };

    $scope.envoyer = function() {
      var incompleteSections = [];
      $scope.sectionsObligatoires.forEach(function(section) {
        if (!$scope.shouldShow(section)) {
          return;
        }

        if (!request.formAnswers[section.id] || !request.formAnswers[section.id].__completion) {
          incompleteSections.push(section);
        }
      });

      $scope.sectionsDocuments.forEach(function(section) {
        if (!request.formAnswers[section.id] || !request.formAnswers[section.id].__completion) {
          incompleteSections.push(section);
        }
      });


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
          $window.alert('Votre demande à été sauvegardé');
        }, onError);
      }
    };
  });
