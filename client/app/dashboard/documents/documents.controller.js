'use strict';

angular.module('impactApp')
  .controller('DocumentCategoriesCtrl', function($scope, $timeout, $http, $cookies, toastr, DocumentCategoryResource, MdphResource, currentMdph, categories, unclassifiedCategory, documentTypes, Upload) {
    $scope.categories = categories;
    $scope.currentMdph = currentMdph;
    $scope.documentTypes = documentTypes;
    $scope.unclassifiedCategory = unclassifiedCategory;
    $scope.token = $cookies.get('token');

    function showAlert(err) {
      if (err) {
        toastr.error('Erreur lors de la sauvegarde', 'Plan de classement');
      } else {
        toastr.success('Sauvegarde effectuée', 'Plan de classement');
      }
    }

    function getUpdatedCategories(categories) {
      return _.map(categories, function(current, key) {
        return {_id: current._id, position: key};
      });
    }

    function updateDocumentType(documentType, oldCategoryId, newCategoryId, callback) {
      $http.post('api/mdphs/' + currentMdph.zipcode + '/document-types', {
        documentType: documentType.id,
        oldCategoryId: oldCategoryId,
        newCategoryId: newCategoryId
      }).then(function() {
        if (callback) {
          callback();
        }

        showAlert();
        return true;
      },

      function() {
        showAlert(true);
        return false;
      });
    }

    function saveUpdatedCategories(updatedCategories) {
      $http.put('api/mdphs/' + currentMdph.zipcode + '/categories', updatedCategories).then(function() {
        showAlert();
        return true;
      },

      function() {
        showAlert(true);
        return false;
      });
    }

    function isDocumentType(node) {
      // TODO: remove stupid hack to check if node is a DocumentType (no _id)
      return typeof node._id === 'undefined';
    }

    $scope.treeOptions = {
      accept: function(sourceNodeScope, destNodesScope) {
        if (isDocumentType(sourceNodeScope.$modelValue)) {
          return destNodesScope.depth() !== 0;
        } else {
          return destNodesScope.depth() === 0;
        }
      },

      dropped: function(event) {
        var targetCategory = event.source.nodeScope.$modelValue;
        var sourceParent = event.source.nodeScope.$parentNodeScope ? event.source.nodeScope.$parentNodeScope.$modelValue : null;
        var destParent = event.dest.nodesScope.$parent.$modelValue;

        if (isDocumentType(targetCategory)) {
          var documentType = targetCategory;
          var oldCategoryId = sourceParent ? sourceParent._id : null;
          var newCategoryId = destParent ? destParent._id : null;

          if (oldCategoryId !== newCategoryId) {
            return updateDocumentType(documentType, oldCategoryId, newCategoryId);
          }
        } else {
          var updatedCategories = getUpdatedCategories($scope.categories);
          return saveUpdatedCategories(updatedCategories);
        }
      }
    };

    $scope.newCategory = function() {
      $http.post('api/mdphs/' + currentMdph.zipcode + '/categories', {position: $scope.categories.length}).then(function(result) {
        $scope.categories.push(result.data);
        showAlert();
      },

      function() {
        showAlert(true);
      });
    };

    $scope.removeDocumentType = function(scope, category) {
      var documentType = scope.$nodeScope.$modelValue;

      category.removeDocumentType(documentType).then(function() {
        var index = category.documentTypes.indexOf(documentType);
        if (index >= 0) {
          category.documentTypes.splice(index, 1);
        }

        $scope.documentTypes.push(documentType);
      });
    };

    $scope.removeCategory = function(scope) {
      var category = scope.$nodeScope.$modelValue;

      category.delete().then(function() {
        showAlert();
        scope.remove();
      },

      function() {
        showAlert(true);
      });
    };

    $scope.save = function(category) {
      category.save().then(function() {
        showAlert();
      },

      function() {
        showAlert(true);
      });
    };

    $scope.upload = function(file, current) {
      Upload.upload({
        url: 'api/mdphs/' + currentMdph.zipcode + '/categories/' + current._id + '/file',
        method: 'POST',
        file: file,
        data: {
          category: current
        }
      })
      .progress(function(evt) {
        if (evt.config.file) {
          current.barcode = {
            name: evt.config.file.name,
            progress: parseInt(100.0 * evt.loaded / evt.total)
          };
        }
      })
      .success(function(data) {
        current.barcode = data;
        showAlert();
      })
      .error(function() {
        showAlert(true);
      });
    };

    $scope.toggle = function(scope) {
      scope.toggle();
    };
  });
