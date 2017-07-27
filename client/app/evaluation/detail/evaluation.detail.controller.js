'use strict';

angular.module('impactApp')
  .controller('EvaluationDetailCtrl', function(
    $scope, $modal, $cookies, $http, $state, $stateParams,
    sections, section, sectionId, model, GevaService, currentSynthese, currentUser) {

    $scope.model = model;
    $scope.sections = sections;
    $scope.token = $cookies.get('token');

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

      currentSynthese.$update({controllerId: currentSynthese._id}, function() {
        $state.go('.', {}, {reload: true});
      });
    };

    $scope.cancel = function() {
      $state.go('.', {}, {reload: true});
    };

    $scope.newIssue = function(parent, question) {
      $modal.open({
        templateUrl: 'app/evaluation/issues/evaluation.new_issue.html',
        controllerAs: 'evaluationNewIssueCtrl',
        size: 'lg',
        controller($modalInstance) {
          this.sectionLabel = section.label;
          this.parent = parent;
          this.question = question;

          this.issue = {
            section: section.id,
            parentId: parent ? parent.id : question.id,
            questionId: question.id,
            title: parent ? question.Libelle : question.Question,
            user: currentUser._id,
            message: ''
          };

          this.create = function() {
            $http
              .post('api/issues/', this.issue)
              .then(() => {
                $modalInstance.dismiss();
                $state.go('.', {}, {reload: true});
              });
          };

          this.cancel = function() {
            $modalInstance.dismiss();
          };
        }
      });
    };
  });
