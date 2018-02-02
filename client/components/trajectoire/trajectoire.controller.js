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

    this.filterIterateResponses = (question) => {
      return (question.isOpen || question.isSelected || this.hasQuestionSelected(question));
    };

    this.filterDisplayQuestion = (question) => {
      return ((!this.sublevel && !this.readOnly) || question.isOpen || question.isParentOpen || question.isSelected);
    };

    function closeTree(question) {
      if (question.Reponses) {
        for (let i = 0; i < question.Reponses.length; i++) {
          question.Reponses[i].isParentOpen = false;
          question.Reponses[i].isOpen = false;
          closeTree(question.Reponses[i]);
        }
      }
    }

    this.toggleCollapse = (question, questions) => {
      question.isOpen = !question.isOpen;
      if (question.isOpen && question.Reponses) {
        for (let i = 0; i < question.Reponses.length; i++) {
          question.Reponses[i].isParentOpen = true;
        }
      } else {
        if (questions) {
          for (let i = 0; i < questions.length; i++) {
            if (question.id === questions[i].id) {
              closeTree(questions[i]);
              break;
            }
          }
        }
      }
    };

    this.toggleSelected = (question, questions) => {
      question.isSelected = !question.isSelected;

      if (!question.isSelected && question.id === this.deficienceQuestionId) {
        this.deficienceQuestionId =  null;
      }

      if ((question.isOpen ? true : false) !== question.isSelected) {
        this.toggleCollapse(question, questions);
      }

      if (question.isSelected && this.sublevel) {
        this.root.isSelected = true;
      }

      if (this.sublevel) {
        // Emetre en evenement pour la sauvegarde
        $scope.$emit('saveEvaluationDetailEvent', this.deficienceQuestionId);
      }
    };

    this.hasQuestionSelected = (question) => {
      if (question.Reponses) {
        for (let i = 0; i < question.Reponses.length; i++) {
          if (question.Reponses[i].isSelected) {
            return true;
          } else {
            if (this.hasQuestionSelected(question.Reponses[i])) {
              return true;
            }
          }
        }
      }

      return false;
    };

    this.deficienceSelected = (question) => {
      this.deficienceQuestionId = this.deficienceQuestionId === question.id ? null : question.id;
      if (this.deficienceQuestionId && !question.isSelected) {
        this.toggleSelected(question);
      } else {
        if (this.sublevel) {
          // Emetre en evenement pour la sauvegarde
          $scope.$emit('saveEvaluationDetailEvent', this.deficienceQuestionId);
        }
      }
    };
  });
