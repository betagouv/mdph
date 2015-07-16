'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, $state, $window, $cookieStore, $modal, documentTypes, sections, Auth, request, RequestService) {
    $scope.request = request;
    $scope.formAnswers = request.formAnswers;
    $scope.token = $cookieStore.get('token');
    $scope.getCompletion = RequestService.getCompletion;
    $scope.estAdulte = function() {
      return RequestService.estAdulte(request);
    };

    $scope.sectionsObligatoires = _.filter(sections, {group: 'obligatoire'});
    $scope.sectionsComplementaires = _.filter(sections, {group: 'complementaire'});
    $scope.sectionsComplements = _.filter(sections, {group: 'complements'});
    $scope.sectionsDocuments = _.filter(sections, {group: 'documents'});

    var documentsObligatoires = _.filter(documentTypes, {type: 'obligatoire'});

    function login(afterLogin) {
      $modal.open({
        templateUrl: 'components/modal/login.html',
        backdrop: true,
        windowClass: 'right fade',
        controller: 'ModalLoginCtrl'
      }).result.then(function(nextStep) {
        // Ok - logged in
        afterLogin(nextStep);
      }, function() {
        // Cancel
        $state.go('departement.demande');
      });
    }

    function alertAfterSave() {
      $window.alert('Votre demande à été sauvegardée');
      $state.go('departement.demande', {shortId: request.shortId});
    }

    function onError(err) {
      $window.alert(err.data.message);
    }

    function saveRequestAndAlert(afterSave) {
      if (request._id) {
        request.$update(afterSave, onError);
      } else {
        request.$save(afterSave, onError);
      }
    }

    $scope.sauvegarder = function() {
      if (Auth.isLoggedIn()) {
        saveRequestAndAlert(alertAfterSave);
      } else {
        login(function() {
          saveRequestAndAlert(alertAfterSave);
        });
      }
    };

    $scope.envoyer = function() {
      if ($scope.user.unconfirmed) {
        $modal.open({
          templateUrl: 'app/demande/modal_envoi_ko.html',
          backdrop: true,
          windowClass: 'right fade',
          controller: function($modalInstance, $scope, user) {
            $scope.user = user;
            $scope.ok = function() {
              $modalInstance.close();
            };
          },
          resolve: {
            user: function() {
              return $scope.user;
            }
          }
        });
        return false;
      }

      RequestService.isReadyToSend(request, $scope.sectionsObligatoires, documentsObligatoires, function(err) {
        if (err) {
          $window.alert(err);
        } else {
          request.status = 'emise';
          request.html = 'Merci d\'avoir passé votre demande sur le service en ligne de la MDPH ' + request.mdph;
          request.$update({isSendingRequest: true}, function () {
            $modal.open({
              templateUrl: 'app/demande/modal_envoi_ok.html',
              backdrop: true,
              windowClass: 'right fade',
              controller: function($modalInstance, $scope) {
                $scope.ok = function() {
                  $modalInstance.close();
                };
              }
            });
            $window.alert('Votre demande à été sauvegardée');
          }, onError);
        }
      });
    };

    $scope.transferer = function() {
      $modal.open({
        templateUrl: 'app/demande/modal_transfert.html',
        backdrop: true,
        windowClass: 'right fade',
        controller: function($scope, $modalInstance, User, knownUsers) {
          $scope.knownUsers = knownUsers;
          $scope.select = function(email) {
            $scope.email = email;
          };
          $scope.ok = function(form) {
            $scope.userNotFound = false;

            if (form.$valid) {
              User.search({email: $scope.email}, function(user) {
                $modalInstance.close(user._id);
              }, function() {
                $scope.userNotFound = $scope.email;
              });
            }
          };
          $scope.cancel = function() {
            $modalInstance.close();
          };
        },
        resolve: {
          knownUsers: function() {
            return request.formAnswers.identites;
          }
        }
      }).result.then(function(newUserId) {
        // Ok - assign new user
        request.$transfer({target: newUserId}, function() {
          $state.go('espace_perso.liste_demandes');
        });
      }, function() {
        // Cancel nothing to do
      });
    };
  });
