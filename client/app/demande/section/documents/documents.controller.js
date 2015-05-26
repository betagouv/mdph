'use strict';

angular.module('impactApp')
  .controller('DocumentsCtrl', function($scope, $modal, $state, $upload, section, request, documentTypes, PreparationEvaluationService) {
    $scope.section = section;
    $scope.request = request;
    $scope.docsList =  PreparationEvaluationService.getSuggestedDocsList($scope.request.formAnswers);

    $scope.saveSection = function() {
      $state.go('^');
    };

    $scope.documentTypesById = _.indexBy(documentTypes, 'id');
    $scope.filesVM = _.groupBy(request.documents, 'type');

    // Initialisation documents obligatoires
    var documentsObligatoires = _.filter(documentTypes, {mandatory: true});
    $scope.documentsObligatoires = _.pluck(documentsObligatoires, 'id');

    // Initialisation documents complementaires
    var typesComplementaires = _.reject(documentTypes, {mandatory: true});
    $scope.documentsComplementaires = [];
    typesComplementaires.forEach(function(type) {
      if ($scope.filesVM[type.id]) {
        $scope.documentsComplementaires.push(type.id);
      }
    });

    $scope.demandePartenaire = function(document) {
      document.asked = true;
      document.files = [];
      $scope.request.$update();
    };

    $scope.onFileSelect = function(file, document) {
      if (!$scope.filesVM[document]) {
        $scope.filesVM[document] = [];
      }
      var type = $scope.filesVM[document];
      var length = type.length;

      $upload.upload({
          url: 'api/requests/' + $scope.request.shortId + '/document',
          method: 'POST',
          file: file,
          data: {
            type: document,
            category: $scope.documentTypesById[document].category
          }
      })
      // TODO: Afficher progression
      // .progress(function (evt) {
      //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      //     console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
      // })
      .success(function (data) {
        $scope.request.documents.push(data);
        type[length] = data;
      });
    };

    $scope.chooseType = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/demande/section/documents/modal_type.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          categories: function () {
            var filtered = [];
            var requested = $scope.documentsComplementaires;

            documentTypes.forEach(function(type) {
              if (requested.indexOf(type.id) < 0 || type.mandatory !== true || type.category !== 'autre') {
                filtered.push(type);
              }
            });

            var categories = _.groupBy(filtered, 'category');
            return categories;
          }
        }
      });

      modalInstance.result.then(function (selected) {
        $scope.documentsComplementaires.push(selected);
      });
    };
  })
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, categories) {
    $scope.categories = categories;

    $scope.select = function(selected) {
      $modalInstance.close(selected.id);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
