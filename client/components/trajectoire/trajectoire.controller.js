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
        return ((!this.sublevel && !this.readOnly) || question.isOpen || question.isParentOpen || !this.sublevel && this.isCurrentQuestion(question)  || question.isSelected || this.hasQuestionSelected(question));
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

    function reverseIsOpen(question, questions) {
      question.isOpen = !question.isOpen;
      if (question.isOpen) {
        if (question.Reponses) {
          for (let quest of question.Reponses) {
            quest.isParentOpen = true;
          }
        }
      } else {
        for (let i = 0; i < questions.length; i++) {
          if (question.id === questions[i].id) {
            closeTree(questions[i]);
            break;
          }
        }
      }
    }

    this.toggleSelected = (question, questions) => {
      question.isSelected = !question.isSelected;
      if ((question.isOpen ? true : false) !== question.isSelected) {
        reverseIsOpen(question, questions);
      }

      if (question.isSelected) {
        this.currentQuestionId = (this.getRootQuestion(question)).id;
      }

      if (question.isSelected && this.sublevel) {
        this.root.isSelected = true;
      }

      if (this.sublevel) {
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

    this.toggleCollapse = (question, questions) => {
      reverseIsOpen(question, questions);
      if (this.currentQuestionId !== (this.getRootQuestion(question)).id) {
        this.currentQuestionId = (this.getRootQuestion(question)).id;
      } else {
        this.currentQuestionId = null;
      }

    };

    this.toggleCollapseSublevel = (question, questions) => {
      reverseIsOpen(question, questions);
    };

  });
