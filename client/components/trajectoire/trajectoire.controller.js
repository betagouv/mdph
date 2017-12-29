'use strict';

angular.module('impactApp')
  .controller('TrajectoireController', function($scope) {

    this.getRootQuestion = (question) => {
      if (this.sublevel) {
        return this.root;
      } else {
        return question;
      }
    };

    this.isCurrentQuestion = (question) => {
      if (this.currentQuestionId !== null) {
        return (this.currentQuestionId === (this.getRootQuestion(question)).id);
      } else {
        return false;
      }
    };

    this.filterQuestion = (question) => {
        /*if (!question.isSelected && hasQuestionSelected(question)) {
          question.isSelected = true;
        }*/

        return ((!this.sublevel && !this.readOnly) || question.inProgress || question.parentInProgress || /*!this.sublevel &&*/ this.isCurrentQuestion(question)  || question.isSelected || this.hasQuestionSelected(question));
      };

    function initParentInProgress(question) {
      question.parentInProgress = false;
      if (question.Reponses) {
        for (let quest of question.Reponses) {
          initParentInProgress(quest);
        }
      }
    }

    function updateInProgress(question) {
      question.inProgress = !question.inProgress;
      if (question.Reponses) {
        for (let quest of question.Reponses) {
          initParentInProgress(quest);
          quest.parentInProgress = question.inProgress;
        }
      }
    }

    this.toggleSelected = (question) => {
      question.isSelected = !question.isSelected;
      question.inProgress = !question.isSelected ? false : !question.inProgress;

      if (question.isSelected) {
        this.currentQuestionId = (this.getRootQuestion(question)).id;
      }

      if (question.isSelected && this.sublevel) {
        this.root.isSelected = true;
      }

      if (!this.sublevel) {
        updateInProgress(question);
      }

      if (this.sublevel /*&& !question.Reponses*/) {
        // Emetre en evenement pour la sauvegarde
        $scope.$emit('saveEvaluationDetailEvent');
      }

    };

    this.isCurrentQuestion = (question) => {
      if (this.currentQuestionId !== null) {
        return (this.currentQuestionId === (this.getRootQuestion(question)).id);
      } else {
        return false;
      }
    };

    this.hasQuestionSelected = (question) => {
      if (question.Reponses) {
        for (let quest of question.Reponses) {
          if (quest.isSelected) {
            return true;
          } else {
            if (this.hasQuestionSelected(quest)) {
              return true;
            }
          }
        }
      }

      return false;
    };

    this.toggleCollapse = (question) => {
      updateInProgress(question);
      if (this.currentQuestionId !== (this.getRootQuestion(question)).id) {
        this.currentQuestionId = (this.getRootQuestion(question)).id;
        this.currentSubQuestionId = question.id;
      } else {
        this.currentQuestionId = null;
        this.currentSubQuestionId = null;
      }

    };

    this.toggleCollapseSublevel = (question) => {
      updateInProgress(question);
      if (this.currentSubQuestionId !== (question.id)) {
        this.currentSubQuestionId = question.id;
      } else {
        this.currentSubQuestionId = null;
      }
    };

  });
