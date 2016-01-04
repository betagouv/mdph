'use strict';

angular.module('impactApp')
  .controller('CategoriesCtrl', function($scope, $timeout, $http, $cookies, MdphResource, currentMdph, categories, pdfCategory, documentTypes, Upload) {
    $scope.categories = categories;
    $scope.currentMdph = currentMdph;
    $scope.documentTypes = documentTypes;
    $scope.pdfCategory = pdfCategory;
    $scope.token = $cookies.get('token');

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
        $scope.saving = 'success';
        if (callback) {
          callback();
        }

        return true;
      },

      function() {
        $scope.saving = 'error';
        return false;
      });
    }

    function saveUpdatedCategories(updatedCategories) {
      $http.put('api/mdphs/' + currentMdph.zipcode + '/categories', updatedCategories).then(function() {
        $scope.saving = 'success';
        return true;
      },

      function() {
        $scope.saving = 'error';
        return false;
      });
    }

    function isDocumentType(node) {
      // TODO: remove stupid hack to check if catA is a DocumentType (no _id)
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
        $scope.saving = 'success';
      },

      function() {
        $scope.saving = 'error';
      });
    };

    $scope.newSubCategory = function(scope) {
      var parent = scope.$nodeScope.$modelValue;
      var position  = parent.children ? parent.children.length : 0;

      $http.post('api/mdphs/' + currentMdph.zipcode + '/categories/' + parent._id, {position: position}).then(function(result) {
        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(result.data);
        $scope.saving = 'success';
      },

      function() {
        $scope.saving = 'error';
      });
    };

    $scope.removeDocumentType = function(scope, category) {
      var documentType = scope.$nodeScope.$modelValue;

      updateDocumentType(documentType, category._id, null, function() {
        var index = category.documentTypes.indexOf(documentType);
        if (index >= 0) {
          category.documentTypes.splice(index, 1);
        }
      });
    };

    $scope.removeCategory = function(scope) {
      var category = scope.$nodeScope.$modelValue;

      $http.delete('api/mdphs/' + currentMdph.zipcode + '/categories/' + category._id).then(function() {
        $scope.saving = 'success';
        scope.remove();
      },

      function() {
        $scope.saving = 'error';
      });
    };

    $scope.save = function(current) {
      $scope.saving = 'pending';

      $http.put('api/mdphs/' + currentMdph.zipcode + '/categories/' + current._id, current).then(function() {
        $scope.saving = 'success';
      },

      function() {
        $scope.saving = 'error';
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
      });
    };
  });
