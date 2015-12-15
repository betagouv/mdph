'use strict';

angular.module('impactApp')
  .controller('CategoriesCtrl', function($scope, $timeout, $http, $cookies, MdphResource, currentMdph, categories, Upload) {
    $scope.categories = categories;
    $scope.currentMdph = currentMdph;
    $scope.token = $cookies.get('token');

    function getUpdatedCategories(categories, targetCategory, targetCategoryParent) {
      return _.map(categories, function(current, key) {
        var toUpdate =  {_id: current._id, position: key};

        if (current === targetCategory) {
          toUpdate.parent = targetCategoryParent._id;
        }

        return toUpdate;
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

    function compareDepth(catA, catB) {
      // If both have parents, both parents are of type string, else both undefined
      return typeof catA.parent === typeof catB.parent;
    }

    $scope.treeOptions = {
      accept: function(sourceNodeScope, destNodesScope) {
        return compareDepth(sourceNodeScope.$modelValue, destNodesScope.$modelValue[0]);
      },

      dropped: function(event) {
        var targetCategory = event.source.nodeScope.$modelValue;
        var sourceParent = event.source.nodeScope.$parentNodeScope ? event.source.nodeScope.$parentNodeScope.$modelValue : null;
        var destParent = event.dest.nodesScope.$parent.$modelValue;

        var updatedCategories;
        if (!sourceParent) {
          // Element is top-level
          updatedCategories = getUpdatedCategories($scope.categories);
        } else {
          if (destParent !== sourceParent) {
            // Category parent changed
            updatedCategories = getUpdatedCategories(destParent.children, targetCategory, destParent);
          } else {
            // Same parent, only adjust positions
            updatedCategories = getUpdatedCategories(destParent.children);
          }
        }

        saveUpdatedCategories(updatedCategories);
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
