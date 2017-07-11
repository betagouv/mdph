'use strict';

angular.module('impactApp')
  .controller('TrajectoireController', function() {

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
      return ((!this.sublevel && !this.readOnly) || this.isCurrentQuestion(question) || question.isSelected);
    };

    this.toggleSelected = (question) => {
      question.isSelected = !question.isSelected;

      if (question.isSelected) {
        this.currentQuestionId = (this.getRootQuestion(question)).id;
      }

      if (question.isSelected && this.sublevel) {
        this.root.isSelected = true;
      }
    };

    this.toggleCollapse = (question) => {
      if (this.currentQuestionId !== (this.getRootQuestion(question)).id) {
        this.currentQuestionId = (this.getRootQuestion(question)).id;
      } else {
        this.currentQuestionId = null;
      }
    };
  });
