'use strict';

angular.module('impactApp')
  .controller('FormulaireCtrl', function ($scope, $http, $window, DroitService, RecapitulatifService) {
    $scope.currentStep = $scope.steps[0];

    if ($scope.request) {
      DroitService.compute($scope.request.formAnswers).success(function(result) {
        $scope.prestations = result;
      });
    }

    $scope.telechargerPDF = function(){
      $http.post('api/requests/' + $scope.request.shortId + '/html_answers.pdf', {
        htmlAnswers: RecapitulatifService.answersToHtml($scope.request)

      }, { responseType: 'arraybuffer' }).success(function(data) {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        $window.open(fileURL);
      });
    };

  });
