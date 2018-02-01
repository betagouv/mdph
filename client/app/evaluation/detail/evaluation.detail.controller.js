'use strict';

angular.module('impactApp')
  .controller('EvaluationDetailCtrl', function(
    $scope, $modal, toastr, $window, $cookies, $http, $state, $stateParams,
    sections, section, sectionId, model, GevaService, currentSynthese, currentUser, SyntheseResource) {

    $scope.model = model;
    $scope.sections = sections;

    $scope.sectionId = sectionId;

    if (!currentSynthese.geva) {
      currentSynthese.geva = {};
    }

    if (!currentSynthese.geva[section.id]) {
      currentSynthese.geva[section.id] = {};
    }

    $scope.currentSynthese = currentSynthese;

    this.birthdate = currentSynthese.birthdate;

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

    function hasQuestionSelected(question) {
      if (question.Reponses) {
        for (let i = 0; i < question.Reponses.length; i++) {
          if (question.Reponses[i].isSelected) {
            return true;
          } else {
            if (hasQuestionSelected(question.Reponses[i])) {
              return true;
            }
          }
        }
      }

      return false;
    }

    function answersToIdArray(root, level) {
      return _.reduce(root, function(result, question) {
        if (question.isSelected || hasQuestionSelected(question)) {
          var reponses = [];

          if (question.Reponses) {
            reponses = answersToIdArray(question.Reponses, level + 1);
            result = result.concat(reponses);
          }

          if (level !== 0 &&  question.isSelected || level === 0 && hasQuestionSelected(question)) {
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

    this.treatBirthDate = function() {
      if (currentSynthese.birthdate && ((new Date(currentSynthese.birthdate)).getTime()) !== ((new Date(this.birthdate)).getTime())) {
        this.change();
      }

      this.birthdate = currentSynthese.birthdate;
    };

    this.change = function() {
      $scope.$emit('saveEvaluationDetailEvent');
    };

    this.download = function() {
      if (currentSynthese.firstname && currentSynthese.lastname && currentSynthese.birthdate) {
        $window.open('api/syntheses/' + currentSynthese._id + '/pdf?access_token=' + $cookies.get('token'), '_self');
      } else {
        toastr.error('Merci de remplir tous les champs de saisie de l\'onglet Eléments du profil pour télécharger une fiche récapitulative de l\'évaluation.');
      }
    };

    $scope.$on('saveEvaluationDetailEvent', function(event, deficienceQuestionId) {
      currentSynthese.geva[section.id] = trajectoiresToIdArray($scope.section.trajectoires);
      currentSynthese.geva.deficience_principale = deficienceQuestionId;
      $scope.noAnswer = (currentSynthese.geva[section.id].length === 0);
      if (currentSynthese._id) {
        SyntheseResource.update(currentSynthese, function() {
          toastr.info('Sauvegarde de la fiche de synthèse effectuée', 'Information');
        });
      } else {
        currentSynthese.mdph = currentUser.mdph;
        SyntheseResource.save(currentSynthese, function(synthese) {
          $state.go('.', {syntheseId: synthese._id});
          toastr.info('Sauvegarde de la fiche de synthèse effectuée', 'Information');
        });
      }
    });

  });
