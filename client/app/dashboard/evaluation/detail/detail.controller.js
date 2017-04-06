'use strict';

angular.module('impactApp')
  .controller('DetailEvaluationCtrl', function($scope, $modal, $cookies, $state, $stateParams, currentMdph, sections, section, sectionId, model, GevaService, listSyntheses, currentSynthese) {
    $scope.model = model;
    $scope.sections = sections;
    $scope.token = $cookies.get('token');
    $scope.listSyntheses = listSyntheses;

    $scope.sectionId = sectionId;

    if (!currentSynthese.geva) {
      currentSynthese.geva = {};
    }

    if (!currentSynthese.geva[section.id]) {
      currentSynthese.geva[section.id] = {};
    }

    $scope.currentSynthese = currentSynthese;

    $scope.section = section;

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

    (function applyModelToSection(section) {
      var model = currentSynthese.geva[section.id];
      _.forEach(section.trajectoires, function(trajectoire) {
        _.forEach(model, function(id) {
          var question = findDeep(trajectoire, id);
          if (question) {
            question.isSelected = true;
          }
        });
      });

    })(section);

    function answersToIdArray(root, level) {
      return _.reduce(root, function(result, question) {
        if (question.isSelected) {
          var reponses = [];

          if (question.Reponses) {
            reponses = answersToIdArray(question.Reponses, level + 1);
            result = result.concat(reponses);
          }

          if (level !== 0 || reponses.length > 0) {
            result.push(question.id);
          } else {
            question.isSelected = false;
          }
        }

        return result;
      }, []);
    }

    function trajectoiresToIdArray(trajectoires) {
      return _.reduce(trajectoires, function(result, trajectoire) {
        return result.concat(answersToIdArray(trajectoire, 0));
      }, []);
    }

    $scope.noAnswer = (trajectoiresToIdArray($scope.section.trajectoires).length === 0);

    $scope.validate = function() {
      currentSynthese.geva[section.id] = trajectoiresToIdArray($scope.section.trajectoires);
      $scope.noAnswer = (currentSynthese.geva[section.id].length === 0);

      currentSynthese.$update({zipcode: currentMdph.zipcode, profileId: currentSynthese.profile, controllerId: currentSynthese._id}, function() {
        $state.go('.', {}, {reload: true});
      });
    };

    $scope.cancel = function() {
      $state.go('.', {}, {reload: true});
    };
  });
