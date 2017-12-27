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

    this.isCurrentSubQuestion = (question) => {

      if (this.currentSubQuestionId !== null) {
        return (this.currentSubQuestionId === question.id);
      } else {
        return false;
      }
    };

    this.filterQuestion = (question) => {
      console.log('filter ' + question.id + ' ' + question.Libelle + ' ' + question.question + ' '+ ( ((!this.sublevel && !this.readOnly) || question.inProgress || this.isCurrentQuestion(question) || question.isSelected) ? "vrai" : "faux") );

        return ((!this.sublevel && !this.readOnly) || question.inProgress || !this.sublevel && this.isCurrentQuestion(question) || !this.sublevel && this.isCurrentSubQuestion(question) || question.isSelected  );

    };

    this.toggleSelected = (question) => {
      question.isSelected = !question.isSelected;
      question.inProgress = true;

      if(question.hasQuestionSelected){
        this.currentQuestionId = (this.getRootQuestion(question)).id;
        this.currentSubQuestionId = question.id;
      }

      if (question.isSelected && this.sublevel) {
        this.root.isSelected = true;
      }

      if (this.sublevel && !question.Reponses) {
        // Emetre en evenement pour la sauvegarde
        $scope.$emit('saveEvaluationDetailEvent');
      }

    };

    this.toggleReduce = (question) => {

      this.currentTraitementQuestionId = question.id;
        this.currentQuestionId = question.id;



       // this.root.isSelected = true;

    };

    this.toggleCollapse = (question) => {
      if (this.sublevel || this.currentQuestionId !== (this.getRootQuestion(question)).id) {
        this.currentQuestionId = (this.getRootQuestion(question)).id;
      } else {
        this.currentQuestionId = null;
        question.inProgress = false;
      }
      this.currentSubQuestionId = null;


      if((!this.sublevel && !this.readOnly) || question.inProgress || this.isCurrentQuestion(question) || question.isSelected  && !question.Reponses){
        console.log('toggleCollapse'+ question.id);
      }
    };

    this.toggleCollapseSublevel = (question) => {
      question.inProgress = !question.inProgress;
      if (this.currentSubQuestionId !== (question.id)) {
        this.currentSubQuestionId = question.id;

      } else {
        this.currentSubQuestionId = null;
      }
      if(!this.sublevel && this.currentQuestionId === question.id || question.isSelected  && !question.Reponses || question.inProgress){
        console.log('toto');
      }

      if((!this.sublevel && !this.readOnly) || question.inProgress || this.isCurrentQuestion(question) || question.isSelected  && !question.Reponses){
        console.log('toggleCollapseSublevel'+ question.id);
      }

    };





    function hasQuestionSelectedd(question) {
      for (let quest in question.Reponses) {
        if (hasQuestionSelectedd(quest)) return true;
      }
      return question.isSelected ;
    }

    this.hasQuestionSelected  = (question) => {
      return hasQuestionSelectedd(question);
    };

  });
