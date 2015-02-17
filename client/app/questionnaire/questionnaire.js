'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement.questionnaire', {
        url: '/questionnaire/:id',
        templateUrl: 'app/questionnaire/questionnaire.html',
        controller: 'QuestionnaireCtrl',
        resolve: {
          request: function($stateParams, $sessionStorage, RequestResource) {
            if ($stateParams.id === 'nouvelle_demande') {
              if (typeof $sessionStorage.request === 'undefined') {
                $sessionStorage.request = new RequestResource();
                $sessionStorage.request.formAnswers = {};
              }
              return $sessionStorage.request;
            }

            return RequestResource.get({shortId: $stateParams.id}).$promise;
          }
        }
      });
  });
