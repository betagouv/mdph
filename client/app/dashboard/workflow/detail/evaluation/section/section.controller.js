'use strict';

angular.module('impactApp')
  .controller('RequestSectionCtrl', function($scope, $stateParams, $state, section, GevaService, request, ReadModeService) {
    if (!request.synthese) {
      request.synthese = {};
    }

    if (!request.synthese.geva) {
      request.synthese.geva = {};
    }

    if (!request.synthese.geva[section.id]) {
      request.synthese.geva[section.id] = {};
    }

    $scope.section = section;

    $scope.getReadMode = ReadModeService.getReadMode;

    $scope.toggle = ReadModeService.toggle;

    function findDeep(array, id) {
      var question = _.find(array, {id: id});
      if (question) {
        return question;
      } else {
        var found = null;
        array.forEach(function(question) {
          if (question.Reponses && !found) {
            found = findDeep(question.Reponses, id);
          }
        });

        return found;
      }
    }

    (function applyModelToSection(request, section) {
      var model = request.synthese.geva[section.id];

      _.forEach(section.trajectoires, function(trajectoire) {
        _.forEach(model, function(id) {
          var question = findDeep(trajectoire, id);
          if (question) {
            question.isSelected = true;
          }
        });
      });

    })(request, section);

    function answersToIdArray(root) {
      return _.reduce(root, function(result, question) {
        if (question.Reponses) {
          var reponses = answersToIdArray(question.Reponses);
          result = result.concat(reponses);
        }

        if (question.isSelected) {
          result.push(question.id);
        }

        return result;
      }, []);
    }

    function trajectoiresToIdArray(trajectoires) {
      return _.reduce(trajectoires, function(result, trajectoire) {
        return result.concat(answersToIdArray(trajectoire));
      }, []);
    }

    $scope.validate = function() {
      request.synthese.geva[section.id] = trajectoiresToIdArray($scope.section.trajectoires);

      request.$update(function() {
        $state.go('^');
      });
    };
  })
  .factory('ReadModeService', function() {
    var readMode = true;

    return {
      getReadMode() {
        return readMode;
      },

      toggle() {
        readMode = !readMode;
      }
    };
  });
